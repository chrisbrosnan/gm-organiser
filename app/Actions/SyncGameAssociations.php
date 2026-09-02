<?php

namespace App\Actions;

use App\Models\Character;
use App\Models\Game;
use App\Models\Location;
use App\Models\Scene;
use App\Models\Character;
use App\Models\Quest;
use App\Models\Item;
use App\Models\Spell;

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
            ...$this->normalizeIds($metaData['npc_characters'] ?? []),
            ...$this->normalizeIds($metaData['enemy_characters'] ?? []),
        ]));
    }

    public function syncFromLocation(Location $location): void
    {
        $selectedGameIds = $this->normalizeIds($location->games);
        $selectedSceneIds = $this->normalizeIds($location->scenes);
        $selectedNonPlayerCharacterIds = $this->normalizeIds($location->npc_characters);
        $selectedEnemyCharacterIds = $this->normalizeIds($location->enemy_characters);
        $selectedQuestIds = $this->normalizeIds($location->quests);
        $selectedItemIds = $this->normalizeIds($location->items);

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

        $characterIdsMerge = array_merge(
            $selectedNonPlayerCharacterIds,
            $selectedEnemyCharacterIds,
        );

        Character::query()
            ->where('user_id', $location->user_id)
            ->get()
            ->each(function (Character $character) use ($location, $characterIdsMerge): void {
                $this->syncCharacterMetaData(
                    $character,
                    'locations',
                    $location->id,
                    in_array($character->id, $characterIdsMerge, true),
                );
            });

        Scene::query()
            ->where('user_id', $location->user_id)
            ->get()
            ->each(function (Scene $scene) use ($location, $selectedSceneIds): void {
                $this->syncSceneMetaData(
                    $scene,
                    'locations',
                    $location->id,
                    in_array($scene->id, $selectedSceneIds, true),
                );
            });

        Quest::query()
            ->where('user_id', $location->user_id)
            ->get()
            ->each(function (Quest $quest) use ($location, $selectedQuestIds): void {
                $this->syncQuestMetaData(
                    $quest,
                    'locations',
                    $location->id,
                    in_array($quest->id, $selectedQuestIds, true),
                );
            });

        Item::query()
            ->where('user_id', $location->user_id)
            ->get()
            ->each(function (Item $item) use ($location, $selectedItemIds): void {
                $this->syncItemMetaData(
                    $item,
                    'locations',
                    $location->id,
                    in_array($item->id, $selectedItemIds, true),
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

    private function syncLocationMetaData(Location $location, string $key, int $recordId, bool $isSelected): void
    {
        $metaData = is_array($location->meta_data) ? $location->meta_data : [];
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
            $location->meta_data = $metaData;
            $location->save();
        }
    }

    private function syncSceneMetaData(Scene $scene, string $key, int $recordId, bool $isSelected): void
    {
        $metaData = is_array($scene->meta_data) ? $scene->meta_data : [];
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
            $scene->meta_data = $metaData;
            $scene->save();
        }
    }

    private function syncCharacterMetaData(Character $character, string $key, int $recordId, bool $isSelected): void
    {
        $metaData = is_array($character->meta_data) ? $character->meta_data : [];
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
            $character->meta_data = $metaData;
            $character->save();
        }
    }

    private function syncQuestMetaData(Quest $quest, string $key, int $recordId, bool $isSelected): void
    {
        $metaData = is_array($quest->meta_data) ? $quest->meta_data : [];
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
            $quest->meta_data = $metaData;
            $quest->save();
        }
    }

    private function syncItemMetaData(Item $item, string $key, int $recordId, bool $isSelected): void
    {
        $metaData = is_array($item->meta_data) ? $item->meta_data : [];
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
            $item->meta_data = $metaData;
            $item->save();
        }
    }

    private function syncSpellMetaData(Spell $spell, string $key, int $recordId, bool $isSelected): void
    {
        $metaData = is_array($spell->meta_data) ? $spell->meta_data : [];
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
            $spell->meta_data = $metaData;
            $spell->save();
        }
    }
}
