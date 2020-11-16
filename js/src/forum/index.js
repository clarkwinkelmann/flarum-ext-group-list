import {extend} from 'flarum/extend';
import app from 'flarum/app';
import IndexPage from 'flarum/components/IndexPage';
import LinkButton from 'flarum/components/LinkButton';
import GroupListPage from './components/GroupListPage';
import GroupListItem from '../common/models/GroupListItem';

app.initializers.add('clarkwinkelmann-group-list', () => {
    app.routes['clarkwinkelmann-group-list'] = {
        path: '/groups',
        component: GroupListPage,
    };

    app.store.models['clarkwinkelmann-group-list-items'] = GroupListItem;

    extend(IndexPage.prototype, 'navItems', items => {
        if (!app.forum.attribute('clarkwinkelmann-group-list.showSideNavLink')) {
            return;
        }

        items.add('clarkwinkelmann-group-list-item', LinkButton.component({
            href: app.route('clarkwinkelmann-group-list'),
            icon: 'fas fa-users',
        }, app.translator.trans('clarkwinkelmann-group-list.forum.nav')), 85);
    });
});
