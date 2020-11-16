<?php

namespace ClarkWinkelmann\GroupList\Providers;

use Flarum\Api\Event\Serializing;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Foundation\AbstractServiceProvider;
use Flarum\Settings\SettingsRepositoryInterface;

class ForumAttributesProvider extends AbstractServiceProvider
{
    public function register()
    {
        $this->app['events']->listen(Serializing::class, [$this, 'serializing']);
    }

    public function serializing(Serializing $event)
    {
        if ($event->isSerializer(ForumSerializer::class)) {
            /**
             * @var $settings SettingsRepositoryInterface
             */
            $settings = app(SettingsRepositoryInterface::class);

            $event->attributes += [
                'clarkwinkelmann-group-list.showSideNavLink' => $settings->get('clarkwinkelmann-group-list.showSideNavLink') !== '0' && $event->actor->hasPermission('clarkwinkelmann-group-list.see'),
                'clarkwinkelmann-group-list.showAvatarBadges' => $settings->get('clarkwinkelmann-group-list.showAvatarBadges') === '1',
                'clarkwinkelmann-group-list.showOnlineStatus' => $settings->get('clarkwinkelmann-group-list.showOnlineStatus') === '1',
            ];
        }
    }
}
