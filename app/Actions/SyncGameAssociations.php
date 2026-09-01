<?php

namespace App\Actions;

use App\Models\Character;
use App\Models\Game;
use App\Models\Location;
use App\Models\Scene;
use Illuminate\Database\Eloquent\Model;

class SyncGameAssociations
{
    /**
     * @return array<int, int>
     */
    public function normalizeIds(mixed $ids): array
    {
        if (is_string($ids)) {
            $ids = json_decode($ids, true);
        }

        if (! is_array($ids)) {
            return [];
        }

        $normalizedIds = array_map(function (mixed $id): ?int {
            $id = rtrim((string) $id, '[]');

            return ctype_digit($id) && (int) $id > 0 ? (int) $id : null;
        }, $ids);

        return array_values(array_unique(array_filter($normalizedIds)));
    }

    public function syncFromGame(Game $game): void
    {
        $metaData = is_array($game->meta_data) ? $game->meta_data : [];

        $this->syncRelatedRecords($game, Location::class, $this->normalizeIds($metaData['locations'] ?? []));
        $this->syncRelatedRecords($game, Scene::class, $this->normalizeIds($metaData['scenes'] ?? []));
        $this->syncRelatedRecords($game, Character::class, $this->normalizeIds([
            ...$this->normalizeIds($metaData['player_characters'] ?? []),
            ...$this->normalizeIds($metaData['npcs'] ?? []),
        ]));
    }

    public function syncFromLocation(Location $location): void
    {
        $selectedGameIds = $this->normalizeIds($location->games);

        Game::query()
            ->where('user_id', $location->user_id)
            ->get()
            ->each(function (Game $game) use ($location, $selectedGameIds): void {
                $this->syncGameMetaData(
                    $game,
                    'locations',
                    $location->id,
                    in_array($game->id, $selectedGameIds, true),
                );
            });
    }

    /**
     * @param  class-string<Model>  $modelClass
     * @param  array<int, int>  $selectedIds
     */
    private function syncRelatedRecords(Game $game, string $modelClass, array $selectedIds): void
    {
        $modelClass::query()
            ->where('user_id', $game->user_id)
            ->get()
            ->each(function (Model $record) use ($game, $selectedIds): void {
                $gameIds = $this->normalizeIds($record->getAttribute('games'));
                $updatedGameIds = array_values(array_filter(
                    $gameIds,
                    fn (int $gameId): bool => $gameId !== $game->id,
                ));

                if (in_array($record->getKey(), $selectedIds, true)) {
                    $updatedGameIds[] = $game->id;
                }

                $updatedGameIds = array_values(array_unique($updatedGameIds));

                if ($gameIds !== $updatedGameIds) {
                    $record->setAttribute('games', $updatedGameIds);
                    $record->save();
                }
            });
    }

    private function syncGameMetaData(Game $game, string $key, int $recordId, bool $isSelected): void
    {
        $metaData = is_array($game->meta_data) ? $game->meta_data : [];
        $recordIds = array_values(array_filter(
            $this->normalizeIds($metaData[$key] ?? []),
            fn (int $id): bool => $id !== $recordId,
        ));

        if ($isSelected) {
            $recordIds[] = $recordId;
        }

        $recordIds = array_values(array_unique($recordIds));

        if ($this->normalizeIds($metaData[$key] ?? []) !== $recordIds) {
            $metaData[$key] = $recordIds;
            $game->meta_data = $metaData;
            $game->save();
        }
    }
}
