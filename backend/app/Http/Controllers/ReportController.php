<?php

namespace App\Http\Controllers;

use App\Models\Rekap;
use App\Models\Lomba;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $query = Rekap::query();

        // Filter berdasarkan tanggal jika ada
        if ($request->has('start_date') && $request->has('end_date')) {
            $query->whereBetween('created_at', [$request->start_date, $request->end_date]);
        }

        // Filter berdasarkan metode bayar
        if ($request->has('metode_bayar') && $request->metode_bayar !== 'semua') {
            $query->where('metode_bayar', $request->metode_bayar);
        }

        // 1. Ringkasan Total & Statistik
        $totalRevenue = $query->sum('nominal_bayar');
        $totalPeserta = $query->count();
        $totalCash = (clone $query)->where('metode_bayar', 'tunai')->sum('nominal_bayar');
        $totalTF = (clone $query)->where('metode_bayar', 'transfer')->sum('nominal_bayar');

        $persenCash = $totalRevenue > 0 ? round(($totalCash / $totalRevenue) * 100, 1) : 0;
        $persenTransfer = $totalRevenue > 0 ? round(($totalTF / $totalRevenue) * 100, 1) : 0;



        // 2. Laporan Per Tanggal (Grouped) - Apply same filters
        $dailyQuery = Rekap::query();
        if ($request->has('start_date') && $request->has('end_date')) {
            $dailyQuery->whereBetween('created_at', [$request->start_date, $request->end_date]);
        }
        if ($request->has('metode_bayar') && $request->metode_bayar !== 'semua') {
            $dailyQuery->where('metode_bayar', $request->metode_bayar);
        }

        $dailyReports = $dailyQuery->select(
            DB::raw('DATE(created_at) as tanggal'),
            DB::raw('COUNT(*) as jumlah_peserta'),
            DB::raw('SUM(nominal_bayar) as total_pendapatan'),
            DB::raw('SUM(CASE WHEN metode_bayar = "tunai" THEN nominal_bayar ELSE 0 END) as cash'),
            DB::raw('SUM(CASE WHEN metode_bayar = "transfer" THEN nominal_bayar ELSE 0 END) as transfer')
        )
        ->groupBy('tanggal')
        ->orderBy('tanggal', 'desc')
        ->get();



        // 3. Total Per Bulan - Apply same filters
        $monthlyQuery = Rekap::query();
        if ($request->has('start_date') && $request->has('end_date')) {
            $monthlyQuery->whereBetween('created_at', [$request->start_date, $request->end_date]);
        }
        if ($request->has('metode_bayar') && $request->metode_bayar !== 'semua') {
            $monthlyQuery->where('metode_bayar', $request->metode_bayar);
        }

        $monthlyReports = $monthlyQuery->select(
            DB::raw("DATE_FORMAT(created_at, '%Y-%m') as bulan"),
            DB::raw('COUNT(*) as jumlah_peserta'),
            DB::raw('SUM(nominal_bayar) as total_pendapatan'),
            DB::raw('SUM(CASE WHEN metode_bayar = "tunai" THEN nominal_bayar ELSE 0 END) as cash'),
            DB::raw('SUM(CASE WHEN metode_bayar = "transfer" THEN nominal_bayar ELSE 0 END) as transfer')
        )
        ->groupBy('bulan')
        ->orderBy('bulan', 'desc')
        ->get();



        return response()->json([
            'summary' => [
                'total_revenue' => $totalRevenue,
                'total_peserta' => $totalPeserta,
                'cash' => $totalCash,
                'transfer' => $totalTF,
                'persen_cash' => $persenCash,
                'persen_transfer' => $persenTransfer
            ],
            'daily' => $dailyReports,
            'monthly' => $monthlyReports
        ]);
    }
}
