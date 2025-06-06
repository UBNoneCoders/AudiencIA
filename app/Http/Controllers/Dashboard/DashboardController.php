<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Hearing;
use App\Models\Process;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clients = Client::query()->select("*")->count();
        $hearings = Hearing::query()->select("*")->count();
        $processes = Process::query()->select("*")->count();

        $startOfWeek = Carbon::now()->startOfWeek();
        $endOfWeek = Carbon::now()->endOfWeek();

        $startOfNextWeek = Carbon::now()->addWeek()->startOfWeek();
        $endOfNextWeek = Carbon::now()->addWeek()->endOfWeek();

        $hearingsThisWeek = Hearing::whereBetween('date', [$startOfWeek, $endOfWeek])->get();
        $hearingsNextWeek = Hearing::whereBetween('date', [$startOfNextWeek, $endOfNextWeek])->get();

        $groupedThisWeek = $this->prepareHearingsForChart($hearingsThisWeek);
        $groupedNextWeek = $this->prepareHearingsForChart($hearingsNextWeek);
        
        return Inertia::render('dashboard', [
            'clients' => $clients,
            'hearings' => $hearings,
            'processes' => $processes,
            'hearings_this_week' => $groupedThisWeek,
            'hearings_next_week' => $groupedNextWeek,
        ]);
    }

    private function prepareHearingsForChart(Collection $hearings)
    {
        return $hearings->groupBy(function ($hearing) {
            return Carbon::parse($hearing->date)->format('Y-m-d');
        })->map(function ($group, $date) {
            return [
                'date' => $date,
                'label' => Carbon::parse($date)->locale('pt_BR')->isoFormat('ddd'),
                'count' => $group->count(),
            ];
        })->values();
    }
}
