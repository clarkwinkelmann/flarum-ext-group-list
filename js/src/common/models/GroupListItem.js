import Model from 'flarum/Model';

export default class GroupListItem extends Model {
    content = Model.attribute('content');
    contentHtml = Model.attribute('contentHtml');

    group = Model.hasOne('group');
    members = Model.hasMany('members');
}
