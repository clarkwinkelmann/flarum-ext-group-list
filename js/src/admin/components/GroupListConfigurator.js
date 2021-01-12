import app from 'flarum/app';
import Button from 'flarum/components/Button';
import Dropdown from 'flarum/components/Dropdown';
import LoadingIndicator from 'flarum/components/LoadingIndicator';
import Group from 'flarum/models/Group';
import icon from 'flarum/helpers/icon';

/* global m */

const translationPrefix = 'clarkwinkelmann-group-list.admin.items.';

export default class SelectFieldOptionEditor {
    oninit() {
        this.items = null;

        app.request({
            method: 'GET',
            url: app.forum.attribute('apiUrl') + '/clarkwinkelmann-group-list',
        }).then(response => {
            this.items = app.store.pushPayload(response);
            m.redraw();
        });
    }

    view() {
        const existingGroups = this.items === null ? [] : this.items.map(item => item.group().id());

        return m('table.GroupListTable', m('tbody', [
            this.items === null ? m('tr', m('td', LoadingIndicator.component())) : this.items.map((item, index) => m('tr', [
                m('td', item.group().namePlural()),
                m('td', m('textarea.FormControl', {
                    onchange: event => {
                        item.save({
                            content: event.target.value,
                        }).then(() => {
                            m.redraw();
                        });
                    },
                    value: item.content(),
                })),
                m('td', m('button.Button', {
                    onclick: event => {
                        event.preventDefault(); // Do not close the settings modal
                        this.moveOption(index, -1);
                    },
                }, icon('fas fa-chevron-up'))),
                m('td', m('button.Button', {
                    onclick: event => {
                        event.preventDefault(); // Do not close the settings modal
                        this.moveOption(index, 1);
                    },
                }, icon('fas fa-chevron-down'))),
                m('td', m('button.Button.Button--danger', {
                    onclick: event => {
                        event.preventDefault(); // Do not close the settings modal
                        item.delete().then(() => {
                            this.items.splice(index, 1);
                            m.redraw();
                        });
                    },
                }, icon('fas fa-times'))),
            ])),
            m('tr', m('td', {
                colspan: 5,
            }, Dropdown.component({
                label: app.translator.trans(translationPrefix + 'add'),
                buttonClassName: 'Button',
            }, app.store.all('groups')
                .filter(group => {
                    if (group.id() === Group.MEMBER_ID || group.id() === Group.GUEST_ID) {
                        // Do not suggest "virtual" groups
                        return false;
                    }

                    // Do not suggest groups already in use
                    return existingGroups.indexOf(group.id()) === -1;
                })
                .map(group => Button.component({
                    onclick: () => {
                        app.request({
                            method: 'POST',
                            url: app.forum.attribute('apiUrl') + '/clarkwinkelmann-group-list-items',
                            body: {
                                data: {
                                    attributes: {
                                        groupId: group.id(),
                                        order: this.items.length,
                                    },
                                },
                            },
                        }).then(response => {
                            this.items.push(app.store.pushPayload(response));
                            m.redraw();
                        });
                    },
                }, group.namePlural()))))),
        ]));
    }

    moveOption(index, moveIndex) {
        const newIndex = index + moveIndex;

        if (newIndex < 0 || newIndex > this.items.length - 1) {
            return;
        }

        Promise.all([
            this.items[index].save({
                order: newIndex,
            }),
            this.items[newIndex].save({
                order: index,
            }),
        ]).then(() => {
            const move = this.items.splice(index, 1);

            this.items.splice(newIndex, 0, move[0]);

            m.redraw();
        });
    }
}
