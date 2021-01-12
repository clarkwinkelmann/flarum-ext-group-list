import app from 'flarum/app';
import SettingsPage from './components/SettingsPage';
import GroupListItem from '../common/models/GroupListItem';

app.initializers.add('clarkwinkelmann-group-list', () => {
    app.store.models['clarkwinkelmann-group-list-items'] = GroupListItem;

    app.extensionData
        .for('clarkwinkelmann-group-list')
        .registerPage(SettingsPage)
        .registerPermission({
            icon: 'fas fa-users',
            label: app.translator.trans('clarkwinkelmann-group-list.admin.permissions.see'),
            permission: 'clarkwinkelmann-group-list.see',
            allowGuest: true,
        }, 'view');
});
