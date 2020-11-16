import app from 'flarum/app';
import Link from 'flarum/components/Link';
import avatar from 'flarum/helpers/avatar';
import listItems from 'flarum/helpers/listItems';
import username from 'flarum/helpers/username';
import userOnline from 'flarum/helpers/userOnline';

/* global m, $ */

export default class UserList {
    view(vnode) {
        return m('ul.GroupList-UserList', vnode.attrs.users.map(user => {

            return m('li.GroupList-UserList-item', m(Link, {
                href: app.route.user(user),
            }, [
                m('.GroupList-UserList-avatar', [
                    avatar(user),
                    this.badges(user, vnode.attrs.hideBadgeId),
                ]),
                m('.GroupList-UserList-user', [
                    app.forum.attribute('clarkwinkelmann-group-list.showOnlineStatus') ? userOnline(user) : null,
                    username(user),
                ]),
            ]));
        }));
    }

    badges(user, hideBadgeId) {
        if (!app.forum.attribute('clarkwinkelmann-group-list.showAvatarBadges')) {
            return null;
        }

        const badges = user.badges();

        if (badges.has(hideBadgeId)) {
            badges.remove(hideBadgeId);
        }

        return m('ul.badges', listItems(badges.toArray()));
    }
}
