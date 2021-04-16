<?php

namespace ClarkWinkelmann\GroupList\Serializers;

use ClarkWinkelmann\GroupList\GroupListItem;
use Flarum\Api\Serializer\AbstractSerializer;
use Flarum\Api\Serializer\BasicUserSerializer;
use Flarum\Api\Serializer\GroupSerializer;
use Flarum\Formatter\Formatter;

class GroupListItemSerializer extends AbstractSerializer
{
    protected $type = 'clarkwinkelmann-group-list-items';

    /**
     * @param GroupListItem $item
     * @return array
     */
    protected function getDefaultAttributes($item)
    {
        $attributes = [
            'content' => null,
            'contentHtml' => null,
        ];

        if ($item->content) {
            /**
             * @var $formatter Formatter
             */
            $formatter = resolve(Formatter::class);

            $attributes['content'] = $formatter->unparse($item->content);
            $attributes['contentHtml'] = $formatter->render($item->content);
        }

        return $attributes;
    }

    public function group($item)
    {
        return $this->hasOne($item, GroupSerializer::class);
    }

    public function members($item)
    {
        return $this->hasMany($item, BasicUserSerializer::class);
    }
}
