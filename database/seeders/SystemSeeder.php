<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\System;

class SystemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rpg_systems = [
            [
                'name' => 'Dungeons & Dragons 5e',
                'description' => 'Dungeons & Dragons 5th Edition is a fantasy tabletop role-playing game (RPG) published by Wizards of the Coast. It is the fifth edition of the Dungeons & Dragons game, and was released in 2014.',
                'version' => 1,
                'meta_data' => [
                    'publisher' => 'Wizards of the Coast',
                    'release_date' => '2014-08-19',
                    'genre' => 'Fantasy',
                    'setting' => 'Forgotten Realms',
                    'mechanics' => [
                        'd20 System',
                        'Class-based character progression',
                        'Hit points and armor class',
                        'Spellcasting and magic items',
                        'Combat and initiative'
                    ],
                ],
            ],
            [
                'name' => 'Pathfinder 2e',
                'description' => 'Pathfinder 2nd Edition is a fantasy tabletop role-playing game (RPG) published by Paizo Publishing. It is the second edition of the Pathfinder game, and was released in 2019.',
                'version' => 1,
                'meta_data' => [
                    'publisher' => 'Paizo Publishing',
                    'release_date' => '2019-08-01',
                    'genre' => 'Fantasy',
                    'setting' => 'Golarion',
                    'mechanics' => [
                        'd20 System',
                        'Class-based character progression',
                        'Hit points and armor class',
                        'Spellcasting and magic items',
                        'Combat and initiative'
                    ],
                ],
            ],
            [
                'name' => 'Call of Cthulhu 7e',
                'description' => 'Call of Cthulhu 7th Edition is a horror tabletop role-playing game (RPG) published by Chaosium. It is the seventh edition of the Call of Cthulhu game, and was released in 2014.',
                'version' => 1,
                'meta_data' => [
                    'publisher' => 'Chaosium',
                    'release_date' => '2014-07-01',
                    'genre' => 'Horror',
                    'setting' => '1920s',
                    'mechanics' => [
                        'Percentile-based skill system',
                        'Sanity and mental health mechanics',
                        'Investigation and mystery-solving gameplay',
                        'Combat and initiative',
                        'Magic and supernatural elements'
                    ],
                ],
            ],
            [
                'name' => 'Shadowrun 6e',
                'description' => 'Shadowrun 6th Edition is a cyberpunk tabletop role-playing game (RPG) published by Catalyst Game Labs. It is the sixth edition of the Shadowrun game, and was released in 2019.',
                'version' => 1,
                'meta_data' => [
                    'publisher' => 'Catalyst Game Labs',
                    'release_date' => '2019-09-01',
                    'genre' => 'Cyberpunk',
                    'setting' => 'Shadowrun Universe',
                    'mechanics' => [
                        'd6 System',
                        'Class-based character progression',
                        'Hit points and armor class',
                        'Magic and cyberware mechanics',
                        'Combat and initiative'
                    ],
                ],
            ],
            [
                'name' => 'Starfinder',
                'description' => 'Starfinder is a science fiction tabletop role-playing game (RPG) published by Paizo Publishing. It is set in the same universe as Pathfinder, but takes place in a distant future where space travel and advanced technology are common.',
                'version' => 1,
                'meta_data' => [
                    'publisher' => 'Paizo Publishing',
                    'release_date' => '2017-08-01',
                    'genre' => 'Science Fiction',
                    'setting' => 'Starfinder Universe',
                    'mechanics' => [
                        'd20 System',
                        'Class-based character progression',
                        'Hit points and armor class',
                        'Spellcasting and magic items',
                        'Combat and initiative'
                    ],
                ],
            ],
            [
                'name' => 'Dungeons & Dragons 3.5e',
                'description' => 'Dungeons & Dragons 3.5 Edition is a fantasy tabletop role-playing game (RPG) published by Wizards of the Coast. It is the third edition of the Dungeons & Dragons game, and was released in 2003.',
                'version' => 1,
                'meta_data' => [
                    'publisher' => 'Wizards of the Coast',
                    'release_date' => '2003-06-01',
                    'genre' => 'Fantasy',
                    'setting' => 'Forgotten Realms',
                    'mechanics' => [
                        'd20 System',
                        'Class-based character progression',
                        'Hit points and armor class',
                        'Spellcasting and magic items',
                        'Combat and initiative'
                    ],
                ],
            ],
            [
                'name' => 'Daggerheart',
                'description' => 'Daggerheart is a fantasy tabletop role-playing game (RPG) published by Daggerheart Games. It is a rules-light game that emphasizes storytelling and player creativity.',
                'version' => 1,
                'meta_data' => [
                    'publisher' => 'Daggerheart Games',
                    'release_date' => '2021-01-01',
                    'genre' => 'Fantasy',
                    'setting' => 'Daggerheart Universe',
                    'mechanics' => [
                        'Rules-light system',
                        'Classless character progression',
                        'Hit points and armor class',
                        'Combat and initiative'
                    ],
                ],
            ],
            [
                'name' => 'GURPS 4e',
                'description' => 'GURPS 4th Edition is a generic tabletop role-playing game (RPG) published by Steve Jackson Games. It is the fourth edition of the GURPS game, and was released in 2004.',
                'version' => 1,
                'meta_data' => [
                    'publisher' => 'Steve Jackson Games',
                    'release_date' => '2004-04-01',
                    'genre' => 'Generic',
                    'setting' => 'GURPS Universe',
                    'mechanics' => [
                        'Point-based character creation',
                        'Skill-based character progression',
                        'Hit points and armor class',
                        'Magic and supernatural elements',
                        'Combat and initiative'
                    ],
                ],
            ],
            [
                'name' => 'Mörk Borg',
                'description' => 'Mörk Borg is a dark fantasy tabletop role-playing game (RPG) published by Fria Ligan. It is a rules-light game that emphasizes storytelling and player creativity.',
                'version' => 1,
                'meta_data' => [
                    'publisher' => 'Fria Ligan',
                    'release_date' => '2020-02-01',
                    'genre' => 'Dark Fantasy',
                    'setting' => 'Mörk Borg Universe',
                    'mechanics' => [
                        'Rules-light system',
                        'Classless character progression',
                        'Hit points and armor class',
                        'Magic and supernatural elements',
                        'Combat and initiative'
                    ],
                ],
            ],
            [
                'name' => 'Star Wars Roleplaying Games',
                'description' => 'Star Wars Roleplaying Games are a series of tabletop role-playing games (RPGs) published by Fantasy Flight Games. They are set in the Star Wars universe and allow players to create their own characters and stories within that setting.',
                'version' => 1,
                'meta_data' => [
                    'publisher' => 'Fantasy Flight Games',
                    'release_date' => '2012-01-01',
                    'genre' => 'Science Fiction',
                    'setting' => 'Star Wars Universe',
                    'mechanics' => [
                        'Narrative dice system',
                        'Class-based character progression',
                        'Hit points and armor class',
                        'Force powers and lightsabers',
                        'Combat and initiative'
                    ],
                ],
            ],
            [
                'name' => 'Warhammer Fantasy Roleplay 4e',
                'description' => 'Warhammer Fantasy Roleplay 4th Edition is a dark fantasy tabletop role-playing game (RPG) published by Cubicle 7. It is the fourth edition of the Warhammer Fantasy Roleplay game, and was released in 2018.',
                'version' => 1,
                'meta_data' => [
                    'publisher' => 'Cubicle 7',
                    'release_date' => '2018-10-01',
                    'genre' => 'Dark Fantasy',
                    'setting' => 'Warhammer Fantasy Universe',
                    'mechanics' => [
                        'Percentile-based skill system',
                        'Class-based character progression',
                        'Hit points and armor class',
                        'Magic and supernatural elements',
                        'Combat and initiative'
                    ],
                ],
            ],
            [
                'name' => 'Cyberpunk Red',
                'description' => 'Cyberpunk Red is a cyberpunk tabletop role-playing game (RPG) published by R. Talsorian Games. It is set in the same universe as Cyberpunk 2020, but takes place in a different time period and features updated rules and mechanics.',
                'version' => 1,
                'meta_data' => [
                    'publisher' => 'R. Talsorian Games',
                    'release_date' => '2020-11-01',
                    'genre' => 'Cyberpunk',
                    'setting' => 'Cyberpunk Universe',
                    'mechanics' => [
                        'd10 System',
                        'Class-based character progression',
                        'Hit points and armor class',
                        'Cyberware and hacking mechanics',
                        'Combat and initiative'
                    ],
                ],
            ],
            [
                'name' => 'Delta Green',
                'description' => 'Delta Green is a modern-day horror tabletop role-playing game (RPG) published by Arc Dream Publishing. It is set in a world where secret government agencies and conspiracies exist to combat supernatural threats, and players take on the roles of agents working to protect humanity from these threats.',
                'version' => 1,
                'meta_data' => [
                    'publisher' => 'Arc Dream Publishing',
                    'release_date' => '1997-01-01',
                    'genre' => 'Modern Horror',
                    'setting' => 'Delta Green Universe',
                    'mechanics' => [
                        'Percentile-based skill system',
                        'Sanity and mental health mechanics',
                        'Investigation and mystery-solving gameplay',
                        'Combat and initiative',
                        'Magic and supernatural elements'
                    ],
                ],
            ],
            [
                'name' => 'Warhammer 40,000 Roleplay',
                'description' => 'Warhammer 40,000 Roleplay is a science fiction tabletop role-playing game (RPG) published by Fantasy Flight Games. It is set in the Warhammer 40,000 universe and allows players to create their own characters and stories within that setting.',
                'version' => 1,
                'meta_data' => [
                    'publisher' => 'Fantasy Flight Games',
                    'release_date' => '2008-01-01',
                    'genre' => 'Science Fiction',
                    'setting' => 'Warhammer 40,000 Universe',
                    'mechanics' => [
                        'Percentile-based skill system',
                        'Class-based character progression',
                        'Hit points and armor class',
                        'Magic and supernatural elements',
                        'Combat and initiative'
                    ],
                ],
            ],
            [
                'name' => 'Alien Roleplaying Game',
                'description' => 'Alien Roleplaying Game is a science fiction tabletop role-playing game (RPG) published by Free League Publishing. It is set in the Alien universe and allows players to create their own characters and stories within that setting.',
                'version' => 1,
                'meta_data' => [
                    'publisher' => 'Free League Publishing',
                    'release_date' => '2019-01-01',
                    'genre' => 'Science Fiction',
                    'setting' => 'Alien Universe',
                    'mechanics' => [
                        'Percentile-based skill system',
                        'Class-based character progression',
                        'Hit points and armor class',
                        'Combat and initiative',
                        'Alien and xenomorph mechanics'
                    ],
                ],
            ],
            [
                'name' => 'Star Trek Adventures',
                'description' => 'Star Trek Adventures is a science fiction tabletop role-playing game (RPG) published by Modiphius Entertainment. It is set in the Star Trek universe and allows players to create their own characters and stories within that setting.',
                'version' => 1,
                'meta_data' => [
                    'publisher' => 'Modiphius Entertainment',
                    'release_date' => '2017-01-01',
                    'genre' => 'Science Fiction',
                    'setting' => 'Star Trek Universe',
                    'mechanics' => [
                        '2d20 System',
                        'Class-based character progression',
                        'Hit points and armor class',
                        'Combat and initiative',
                        'Starship mechanics'
                    ],
                ],
            ],
            [
                'name' => 'Shiver',
                'description' => 'Shiver is a horror tabletop role-playing game (RPG) published by Free League Publishing. It is set in a world where supernatural creatures exist and players take on the roles of hunters working to protect humanity from these threats.',
                'version' => 1,
                'meta_data' => [
                    'publisher' => 'Free League Publishing',
                    'release_date' => '2020-01-01',
                    'genre' => 'Horror',
                    'setting' => 'Shiver Universe',
                    'mechanics' => [
                        'Percentile-based skill system',
                        'Sanity and mental health mechanics',
                        'Investigation and mystery-solving gameplay',
                        'Combat and initiative',
                        'Magic and supernatural elements'
                    ],
                ],
            ],
            [
                'name' => 'Blades in the Dark',
                'description' => 'Blades in the Dark is a dark fantasy tabletop role-playing game (RPG) published by Evil Hat Productions. It is set in a world where players take on the roles of criminals working to build their own criminal empire.',
                'version' => 1,
                'meta_data' => [
                    'publisher' => 'Evil Hat Productions',
                    'release_date' => '2017-01-01',
                    'genre' => 'Dark Fantasy',
                    'setting' => 'Blades in the Dark Universe',
                    'mechanics' => [
                        'D6 System',
                        'Classless character progression',
                        'Hit points and armor class',
                        'Combat and initiative',
                        'Crime and heist mechanics'
                    ],
                ],
            ],
            [
                'name' => 'Monster of the Week',
                'description' => 'Monster of the Week is a modern-day horror tabletop role-playing game (RPG) published by Evil Hat Productions. It is set in a world where players take on the roles of hunters working to protect humanity from supernatural threats.',
                'version' => 1,
                'meta_data' => [
                    'publisher' => 'Evil Hat Productions',
                    'release_date' => '2012-01-01',
                    'genre' => 'Modern Horror',
                    'setting' => 'Monster of the Week Universe',
                    'mechanics' => [
                        'D6 System',
                        'Class-based character progression',
                        'Hit points and armor class',
                        'Sanity and mental health mechanics',
                        'Combat and initiative'
                    ],
                ],
            ],
            [
                'name' => 'The One Ring',
                'description' => 'The One Ring is a fantasy tabletop role-playing game (RPG) published by Free League Publishing. It is set in the world of J.R.R. Tolkien\'s Middle-earth and allows players to create their own characters and stories within that setting.',
                'version' => 1,
                'meta_data' => [
                    'publisher' => 'Free League Publishing',
                    'release_date' => '2011-01-01',
                    'genre' => 'Fantasy',
                    'setting' => 'Middle-earth',
                    'mechanics' => [
                        'D6 System',
                        'Class-based character progression',
                        'Hit points and armor class',
                        'Combat and initiative',
                        'Magic and supernatural elements'
                    ],
                ],
            ],
            [
                'name' => 'Fate Core',
                'description' => 'Fate Core is a generic tabletop role-playing game (RPG) published by Evil Hat Productions. It is a rules-light game that emphasizes storytelling and player creativity.',
                'version' => 1,
                'meta_data' => [
                    'publisher' => 'Evil Hat Productions',
                    'release_date' => '2013-01-01',
                    'genre' => 'Generic',
                    'setting' => 'Fate Universe',
                    'mechanics' => [
                        'Fate System',
                        'Classless character progression',
                        'Hit points and armor class',
                        'Combat and initiative',
                        'Magic and supernatural elements'
                    ],
                ],
            ],
            [
                'name' => 'Savage Worlds',
                'description' => 'Savage Worlds is a generic tabletop role-playing game (RPG) published by Pinnacle Entertainment Group. It is a rules-light game that emphasizes fast-paced action and cinematic gameplay.',
                'version' => 1,
                'meta_data' => [
                    'publisher' => 'Pinnacle Entertainment Group',
                    'release_date' => '2003-01-01',
                    'genre' => 'Generic',
                    'setting' => 'Savage Worlds Universe',
                    'mechanics' => [
                        'Savage Worlds System',
                        'Classless character progression',
                        'Hit points and armor class',
                        'Combat and initiative',
                        'Magic and supernatural elements'
                    ],
                ],
            ],
            [
                'name' => 'Traveller',
                'description' => 'Traveller is a science fiction tabletop role-playing game (RPG) published by Mongoose Publishing. It is set in a universe where players take on the roles of spacefaring adventurers exploring the galaxy.',
                'version' => 1,
                'meta_data' => [
                    'publisher' => 'Mongoose Publishing',
                    'release_date' => '1977-01-01',
                    'genre' => 'Science Fiction',
                    'setting' => 'Traveller Universe',
                    'mechanics' => [
                        'Percentile-based skill system',
                        'Class-based character progression',
                        'Hit points and armor class',
                        'Combat and initiative',
                        'Space travel and starship mechanics'
                    ],
                ],
            ],
            [
                'name' => 'Starfinder',
                'description' => 'Starfinder is a science fiction tabletop role-playing game (RPG) published by Paizo Publishing. It is set in a universe where players take on the roles of spacefaring adventurers exploring the galaxy.',
                'version' => 1,
                'meta_data' => [
                    'publisher' => 'Paizo Publishing',
                    'release_date' => '2017-01-01',
                    'genre' => 'Science Fiction',
                    'setting' => 'Starfinder Universe',
                    'mechanics' => [
                        'd20 System',
                        'Class-based character progression',
                        'Hit points and armor class',
                        'Combat and initiative',
                        'Space travel and starship mechanics'
                    ],
                ],
            ],
            [
                'name' => 'Pendragon',
                'description' => 'Pendragon is a fantasy tabletop role-playing game (RPG) published by Chaosium. It is set in a world inspired by Arthurian legend and allows players to create their own characters and stories within that setting.',
                'version' => 1,
                'meta_data' => [
                    'publisher' => 'Chaosium',
                    'release_date' => '1985-01-01',
                    'genre' => 'Fantasy',
                    'setting' => 'Arthurian Legend',
                    'mechanics' => [
                        'Percentile-based skill system',
                        'Class-based character progression',
                        'Hit points and armor class',
                        'Combat and initiative',
                        'Chivalry and honor mechanics'
                    ],
                ],
            ],
            [
                'name' => 'Runescape Roleplaying Game',
                'description' => 'Runescape Roleplaying Game is a fantasy tabletop role-playing game (RPG) published by Jagex. It is set in the world of Gielinor and allows players to create their own characters and stories within that setting.',
                'version' => 1,
                'meta_data' => [
                    'publisher' => 'Jagex',
                    'release_date' => '2001-01-01',
                    'genre' => 'Fantasy',
                    'setting' => 'Gielinor',
                    'mechanics' => [
                        'Class-based character progression',
                        'Hit points and armor class',
                        'Combat and initiative',
                        'Magic and supernatural elements',
                        'Skill-based progression'
                    ],
                ],
            ],
            [
                'name' => 'Rivers of London Roleplaying Game',
                'description' => 'Rivers of London Roleplaying Game is a modern-day fantasy tabletop role-playing game (RPG) published by Cubicle 7. It is set in the world of the Rivers of London book series and allows players to create their own characters and stories within that setting.',
                'version' => 1,
                'meta_data' => [
                    'publisher' => 'Cubicle 7',
                    'release_date' => '2020-01-01',
                    'genre' => 'Modern Fantasy',
                    'setting' => 'Rivers of London Universe',
                    'mechanics' => [
                        'Class-based character progression',
                        'Hit points and armor class',
                        'Combat and initiative',
                        'Magic and supernatural elements',
                        'Investigation and mystery-solving gameplay'
                    ],
                ],
            ],
            [
                'name' => 'Marvel Universe Roleplaying Game',
                'description' => 'Marvel Universe Roleplaying Game is a superhero tabletop role-playing game (RPG) published by Margaret Weis Productions. It is set in the Marvel Universe and allows players to create their own characters and stories within that setting.',
                'version' => 1,
                'meta_data' => [
                    'publisher' => 'Margaret Weis Productions',
                    'release_date' => '2012-01-01',
                    'genre' => 'Superhero',
                    'setting' => 'Marvel Universe',
                    'mechanics' => [
                        'Class-based character progression',
                        'Hit points and armor class',
                        'Combat and initiative',
                        'Superpowers and abilities',
                        'Investigation and mystery-solving gameplay'
                    ],
                ],
            ],
            [
                'name' => 'Shadowrun',
                'description' => 'Shadowrun is a cyberpunk tabletop role-playing game (RPG) published by Catalyst Game Labs. It is set in a dystopian future where players take on the roles of shadowrunners, mercenaries who operate outside the law.',
                'version' => 1,
                'meta_data' => [
                    'publisher' => 'Catalyst Game Labs',
                    'release_date' => '1989-01-01',
                    'genre' => 'Cyberpunk',
                    'setting' => 'Shadowrun Universe',
                    'mechanics' => [
                        'Class-based character progression',
                        'Hit points and armor class',
                        'Combat and initiative',
                        'Magic and cyberware mechanics',
                        'Investigation and mystery-solving gameplay'
                    ],
                ],
            ],
            [
                'name' => 'Shadowdark',
                'description' => 'Shadowdark is a dark fantasy tabletop role-playing game (RPG) published by KOBOLD Press. It is set in a world where players take on the roles of adventurers exploring dangerous dungeons and facing deadly monsters.',
                'version' => 1,
                'meta_data' => [
                    'publisher' => 'KOBOLD Press',
                    'release_date' => '2021-01-01',
                    'genre' => 'Dark Fantasy',
                    'setting' => 'Shadowdark Universe',
                    'mechanics' => [
                        'Class-based character progression',
                        'Hit points and armor class',
                        'Combat and initiative',
                        'Magic and supernatural elements',
                        'Dungeon exploration and monster mechanics'
                    ],
                ],
            ],
            [
                'name' => 'Dungeon Crawl Classics',
                'description' => 'Dungeon Crawl Classics is a fantasy tabletop role-playing game (RPG) published by Goodman Games. It is set in a world where players take on the roles of adventurers exploring dangerous dungeons and facing deadly monsters.',
                'version' => 1,
                'meta_data' => [
                    'publisher' => 'Goodman Games',
                    'release_date' => '2012-01-01',
                    'genre' => 'Fantasy',
                    'setting' => 'Dungeon Crawl Classics Universe',
                    'mechanics' => [
                        'Class-based character progression',
                        'Hit points and armor class',
                        'Combat and initiative',
                        'Magic and supernatural elements',
                        'Dungeon exploration and monster mechanics'
                    ],
                ],
            ],
            [
                'name' => 'White Box',
                'description' => 'White Box is a fantasy tabletop role-playing game (RPG) published by Necrotic Gnome. It is a rules-light game that emphasizes old-school gameplay and player creativity.',
                'version' => 1,
                'meta_data' => [
                    'publisher' => 'Necrotic Gnome',
                    'release_date' => '2006-01-01',
                    'genre' => 'Fantasy',
                    'setting' => 'White Box Universe',
                    'mechanics' => [
                        'Class-based character progression',
                        'Hit points and armor class',
                        'Combat and initiative',
                        'Magic and supernatural elements',
                        'Old-school gameplay mechanics'
                    ],
                ],
            ],
            [
                'name' => 'Basic Fantasy Role-Playing Game',
                'description' => 'Basic Fantasy Role-Playing Game is a fantasy tabletop role-playing game (RPG) published by Chris Gonnerman. It is a rules-light game that emphasizes old-school gameplay and player creativity.',
                'version' => 1,
                'meta_data' => [
                    'publisher' => 'Chris Gonnerman',
                    'release_date' => '2007-01-01',
                    'genre' => 'Fantasy',
                    'setting' => 'Basic Fantasy Universe',
                    'mechanics' => [
                        'Class-based character progression',
                        'Hit points and armor class',
                        'Combat and initiative',
                        'Magic and supernatural elements',
                        'Old-school gameplay mechanics'
                    ],
                ],
            ],
            [
                'name' => 'Castles and Crusades',
                'description' => 'Castles and Crusades is a fantasy tabletop role-playing game (RPG) published by Troll Lord Games. It is a rules-light game that emphasizes old-school gameplay and player creativity.',
                'version' => 1,
                'meta_data' => [
                    'publisher' => 'Troll Lord Games',
                    'release_date' => '2004-01-01',
                    'genre' => 'Fantasy',
                    'setting' => 'Castles and Crusades Universe',
                    'mechanics' => [
                        'Class-based character progression',
                        'Hit points and armor class',
                        'Combat and initiative',
                        'Magic and supernatural elements',
                        'Old-school gameplay mechanics'
                    ],
                ],
            ],
            [
                'name' => 'Other / Homebrew Systems',
                'description' => 'This covers any other systems that are not listed above, including homebrew systems created by the user.',
                'version' => 1,
                'meta_data' => [],
            ]
        ];

        foreach ($rpg_systems as $system) {
            System::create($system);
        }
    }
}
