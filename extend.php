<?php

namespace ClarkWinkelmann\GroupList;

use Flarum\Extend;
use Flarum\Foundation\Application;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/resources/less/forum.less')
        ->route('/groups', 'clarkwinkelmann-group-list'),
    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js'),
    new Extend\Locales(__DIR__ . '/resources/locale'),
    (new Extend\Routes('api'))
        ->get('/clarkwinkelmann-group-list', 'clarkwinkelmann-group-list', Controllers\GroupListController::class)
        ->post('/clarkwinkelmann-group-list-items', 'clarkwinkelmann-group-list', Controllers\ItemStoreController::class)
        ->patch('/clarkwinkelmann-group-list-items/{id:[0-9]+}', 'clarkwinkelmann-group-list', Controllers\ItemUpdateController::class)
        ->delete('/clarkwinkelmann-group-list-items/{id:[0-9]+}', 'clarkwinkelmann-group-list', Controllers\ItemDeleteController::class),
    function (Application $app) {
        $app->register(Providers\ForumAttributesProvider::class);
    },
];
