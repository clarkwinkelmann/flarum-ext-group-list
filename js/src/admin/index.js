import {extend} from 'flarum/extend';
import app from 'flarum/app';
import PermissionGrid from 'flarum/components/PermissionGrid';
import SettingsModal from './components/SettingsModal';
import GroupListItem from '../common/models/GroupListItem';

app.initializers.add('clarkwinkelmann-group-list', () => {
    app.extensionSettings['clarkwinkelmann-group-list'] = () => app.modal.show(SettingsModal);

    app.store.models['clarkwinkelmann-group-list-items'] = GroupListItem;

    extend(PermissionGrid.prototype, 'viewItems', items => {
        items.add('clarkwinkelmann-group-list-see', {
            icon: 'fas fa-users',
            label: app.translator.trans('clarkwinkelmann-group-list.admin.permissions.see'),
            permission: 'clarkwinkelmann-group-list.see',
            allowGuest: true,
        });
    });
});
