<?php


namespace App\Http\Services;


use App\Models\ShortenedLink;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class ShortenedLinkService
{
    /**
     * @param $link
     * @return Builder|Model
     */
    public static function CreateLink($link): Builder|Model
    {
        // make code for shorted link
        $code = substr(md5(uniqid(rand(), true)),0,6);

        // Create shortened link
        return ShortenedLink::query()->create([
            'link'         => $link,
            'code'         => $code,
            'ip_address'   => request()->ip ?? null
        ]);
    }

    /**
     * @param string $code
     * @return string|null
     */
    public static function LinkByCode(string $code): string|null
    {
        return ShortenedLink::query()->where('code', $code)->first()?->link;
    }
}
