<?php

namespace App\Http\Controllers;

use App\Http\Requests\ShortLinkCreateRequest;
use App\Http\Services\ShortenedLinkService;
use App\Models\ShortenedLink;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;

class ShortLinkController extends Controller
{

    /**
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        return response()->json(ShortenedLink::all());
    }

    /**
     * @param ShortLinkCreateRequest $request
     * @return JsonResponse
     */
    public function store(ShortLinkCreateRequest $request): JsonResponse
    {
        return response()->json(ShortenedLinkService::CreateLink($request->link));
    }

    /**
     * @param string $code
     * @return RedirectResponse
     */
    public function redirectToUrl(string $code): RedirectResponse
    {
        return redirect()->to(ShortenedLinkService::LinkByCode($code));
    }
}
