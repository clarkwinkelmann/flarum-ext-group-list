import app from 'flarum/app';
import ExtensionPage from 'flarum/components/ExtensionPage';
import Switch from 'flarum/components/Switch';
import GroupListConfigurator from './GroupListConfigurator';

/* global m */

const settingsPrefix = 'clarkwinkelmann-group-list.';
const translationPrefix = 'clarkwinkelmann-group-list.admin.settings.';

export default class SettingsPage extends ExtensionPage {
    content() {
        return m('.ExtensionPage-settings', m('.container', [
            m('.Form-group', m(GroupListConfigurator)),
            m('.Form-group', [
                Switch.component({
                    state: this.setting(settingsPrefix + 'showSideNavLink', '1')() === '1',
                    onchange: value => {
                        this.setting(settingsPrefix + 'showSideNavLink')(value ? '1' : '0');
                    },
                }, app.translator.trans(translationPrefix + 'showSideNavLink')),
            ]),
            m('.Form-group', [
                Switch.component({
                    state: this.setting(settingsPrefix + 'showAvatarBadges')() === '1',
                    onchange: value => {
                        this.setting(settingsPrefix + 'showAvatarBadges')(value ? '1' : '0');
                    },
                }, app.translator.trans(translationPrefix + 'showAvatarBadges')),
            ]),
            m('.Form-group', [
                Switch.component({
                    state: this.setting(settingsPrefix + 'showOnlineStatus')() === '1',
                    onchange: value => {
                        this.setting(settingsPrefix + 'showOnlineStatus')(value ? '1' : '0');
                    },
                }, app.translator.trans(translationPrefix + 'showOnlineStatus')),
            ]),
            m('.Form-group', this.submitButton()),
        ]));
    }
}
