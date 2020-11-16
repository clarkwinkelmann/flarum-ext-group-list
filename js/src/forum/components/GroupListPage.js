import Page from 'flarum/components/Page';
import IndexPage from 'flarum/components/IndexPage';
import LoadingIndicator from 'flarum/components/LoadingIndicator';
import GroupBadge from 'flarum/components/GroupBadge';
import listItems from 'flarum/helpers/listItems';
import UserList from './UserList';

/* global m */

export default class GroupListPage extends Page {
    oninit(vnode) {
        super.oninit(vnode);

        this.items = null;

        app.request({
            method: 'GET',
            url: app.forum.attribute('apiUrl') + '/clarkwinkelmann-group-list',
        }).then(response => {
            this.items = app.store.pushPayload(response);
            m.redraw();
        });

        this.bodyClass = 'GroupList-page';
    }

    view() {
        return m('.IndexPage', [
            IndexPage.prototype.hero(),
            m('.container', m('.sideNavContainer', [
                m('nav.IndexPage-nav.sideNav', m('ul', listItems(IndexPage.prototype.sidebarItems().toArray()))),
                m('.IndexPage-results.sideNavOffset.GroupList-content', this.content()),
            ])),
        ]);
    }

    content() {
        if (this.items === null) {
            return LoadingIndicator.component();
        }

        return this.items.map(item => m('div', [
            m('h3.GroupList-title', [
                GroupBadge.component({
                    group: item.group(),
                }),
                ' ',
                item.group().namePlural(),
            ]),
            item.contentHtml() ? m('.GroupList-description', m.trust(item.contentHtml())) : null,
            m(UserList, {
                users: item.members(),
                hideBadgeId: 'group' + item.group().id(),
            }),
        ]));
    }
}
