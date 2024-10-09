import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import * as fromContainers from './containers';
import * as fromGuards from './../../guards';


const routes: Routes = [
    {
        path: '',
        component: fromContainers.PrivateLayoutComponent,
        // canActivate: [fromGuards.PrivateGuard],
        data: {
          title: 'Home'
        },
        children: [
          { path: '', redirectTo: 'portfolio', pathMatch: 'full' },
          { path: 'home', loadChildren: () => import('./../../features/landing/landing.module').then(m => m.LandingModule), data: { title: 'Home' } },
          { path: 'pool', loadChildren: () => import('./../../features/pool/pool.module').then(m => m.PoolModule), data: { title: 'Pool Viewer' } },
          { path: 'sizing', loadChildren: () => import('./../../features/sizing/sizing.module').then(m => m.SizingModule), data: { title: 'Sizing' } },
          {
            path: 'drawdown',
            loadChildren: () => import('./../../features/drawdown-analysis/drawdown-analysis.module').then(m => m.DrawdownAnalysisModule),
            data: {
              title: 'Drawdown Analysis'
            }
          },
          {
            path: 'correlation',
            loadChildren: () => import('./../../features/moving-correlation/moving-correlation.module').then(m => m.MovingCorrelationModule),
            data: {
              title: 'Moving Correlation'
            }
          },
          {
            path: 'tbareports',
            loadChildren: () => import('./../../features/tbareports/tbareports.module').then(m => m.TbaReportsModule),
            data: {
              title: 'TBA Report'
            }
          },
          {
            path: 'portfolio-analysis',
            loadChildren: () => import('./../../features/portfolio-analysis/portfolio-analysis.module').then(m => m.PortfolioAnalysisModule),
            data: {
              title: 'Portfolio Analysis'
            }
          },

          {
            path: 'agency',
            loadChildren: () => import('./../../features/agency_analytics/agency-analytics.module').then(m => m.AgencyAnalyticsModule),
            data: {
              title: 'Agency MBS Analytics'
            }
          },

          {
            path: 'jpm-agency-analytics',
            loadChildren: () => import('./../../features/jpm-agency-deliverables/jpm-agency-deliverables.module').then(m => m.JpmAgencyDeliverablesModule),
            data: {
              title: 'JPM Agency Analytics'
            }
          },
          // {
          //   path: 'timeseries-analysis',
          //   loadChildren: () => import('./../../features/timeseries-analysis/timeseries-analysis.module').then(m => m.TimeseriesAnalysisModule),
          //   data: {
          //     title: 'Timeseries Analysis'
          //   }
          // },

          // {
          //   path: 'agency-market-color',
          //   loadChildren: () => import('./../../features/agency-market-color/agency-market-color.module').then(m => m.AgencyMarketColorModule),
          //   data: {
          //     title: 'Agency Market Color'
          //   }
          // },
          // {
          //   path: 'euro-rates',
          //   loadChildren: () => import('./../../features/euro-rates/euro-rates.module').then(m => m.EuroRatesModule),
          //   data: {
          //     title: 'Agency Market Color'
          //   }
          // },
          {
            path: 'jbot',
            loadChildren: () => import('./../../features/jbot/jbot.module').then(m => m.JbotModule),
            data: {
              title: 'Jbot'
            }
          },
          // {
          //   path: 'vol-report',
          //   loadChildren: () => import('./../../features/vol-report/vol-report.module').then(m => m.VolReportModule),
          // },
          {
            path: 'agency-portfolio',
            loadChildren: () => import('./../../features/agency-portfolio//agency-portfolio.module').then(m => m.AgencyPortfolioModule),
            data: {
              title: 'Agency Portfolio'
            }
          },
          {
            path: 'tracking',
            loadChildren: () => import('./../../features/daily-tracking/daily-tracking.module').then(m => m.DailyTrackingModule),
            data: {
              title: 'Daily Tracking'
            }
          },
          // {
          //   path: 'risk-span',
          //   loadChildren: () => import('./../../features/risk-span/risk-span.module').then(m => m.RiskSpanModule),
          //   data: {
          //     title: 'Risk Span'
          //   }
          // },
          {
            path: 'macro',
            loadChildren: () => import('./../../features/macro-package/macro-package.module').then(m => m.MacroAnalyticsPackageModule),
            data: {
              title: 'Risk Span'
            }
          },
          {
            path: 'benchmarkportfolio',
            loadChildren: () => import('./../../features/benchmark-portfolio/benchmark-portfolio.module').then(m => m.BenchmarkPortfolioModule),
            data: {
              title: 'benchmark Portfolio'
            }
          },
          {
            path: 'portfolio',
            loadChildren: () => import('./../../features/rcpm2-0/rcpm2-0.module').then(m => m.Rcpm20Module),
            data: {
              title: 'Portfolio'
            }
          },
          {
            path: 'recs',
            loadChildren: () => import('./../../features/rcpm-pnl-rec/rcpm-pnl-rec.module').then(m => m.RcpmPnlRecModule)
          },
          {
            path: 'market-data-rates',
            loadChildren: () => import('./../../features/market-data-rates/market-data-rates.module').then(m => m.MarketDataRatesModule),
            data: {
              title: 'Market Data Rates'
            }
          },
          {
            path: 'allocations',
            loadChildren: () => import('./../../features/allocations/allocations.module').then(m => m.AllocationsModule),
            data: {
              title: 'Trade Allocations'
            }
          },
          // {
          //   path: 'worldevents',
          //   loadChildren: () => import('./../../features/world-events/world-events.module').then(m => m.WorldEventsModule),
          //   data: {
          //     title: 'Portfolio'
          //   }
          // },
          {
            path: 'optiondeltas',
            loadChildren: () => import('./../../features/option-vols/option-vols.module').then(m => m.OptionVolsModule),
            data: {
              title: 'Options Pricing (by Delta)'
            }
          },
          {
            path: 'fxoptionsgrid',
            loadChildren: () => import('./../../features/fx-options-grid/fx-options-grid.module').then(m => m.FXOptionsGridModule),
            data: {
              title: 'FX Options Grid'
            }
          },
          {
            path: 'benchmark-monitor',
            loadChildren: () => import('./../../features/benchmark-monitor/benchmark-monitor.module').then(m => m.BenchmarkMonitorModule),
            data: {
              title: 'Benchmark'
            }
          },
          {
            path: 'leverage',
            loadChildren: () => import('./../../features/leverage/leverage.module').then(m => m.LeverageModule),
            data: {
              title: 'Leverage'
            }
          },
          {
            path: 'drift',
            loadChildren: () => import('./../../features/drift/drift.module').then(m => m.DriftModule),
            data: {
              title: 'Portfolio & Position Drift'
            }
          },
          {
            path: 'attribution',
            loadChildren: () => import('./../../features/pnl-attribution/pnl-attribution.module').then(m => m.PnlAttributionModule),
            data: {
              title: 'P&L Attribution'
            }
          },
          {
            path: 'health',
            loadChildren: () => import('./../../features/health/health.module').then(m => m.HealthModule),
            data: {
              title: 'System Health'
            }
          },
          {
            path: 'counterparty',
            loadChildren: () => import('./../../features/counterparty/counterparty.module').then(m => m.CounterpartyModule),
            data: {
              title: 'Exposures'
            }
          }, 
          {
            path: 'sovereign/cds-spreads', 
            loadChildren: () => import('./../../features/sovereign-cds-spreads/sovereign-cds-spreads.module').then(m => m.SovereignCdsSpreadsModule),
            data: {
              title: 'Exposures'
            }
          }, 
          {
            path: 'sockets',
            loadChildren: () => import('../../features/sockets-dashboard/sockets-dashboard.module').then(m => m.SocketModule),
            data: {
              title: 'Sockets'
            }
          },
          {
            path: 'exposure-ladder',
            loadChildren: () => import('./../../features/exposure-ladder/exposure-ladder.module').then(m => m.ExposureLadderModule),
            data: {
              title: 'Exposure Ladder'
            }
          },
          {
            path: 'factor-exposure',
            loadChildren: () => import('./../../features/factor-exposure/factor-exposure.module').then(m => m.FactorExposureModule),
            data: {
              title: 'Factor Exposure'
            }
          },
          {
            path: 'clientsolutions',
            loadChildren: () => import('./../../features/client-solutions/client-solutions.module').then(m => m.ClientSolutionsModule),
            data: {
              title: 'Client Solutions'
            }
          },
          // These are all mdm modules
          {
            path: 'data/tagging',
            loadChildren: () => import('./../../features/tagging/tagging.module').then(m => m.TaggingModule),
            data: {
              title: 'Data Tagging'
            }
          },
          {
            path: 'data/secmaster',
            loadChildren: () => import('./../../features/sec-master/sec-master.module').then(m => m.SecurityMasterModule),
            data: {
              title: 'Security Master'
            }
          },
          {
            path: 'data/timeseries',
            loadChildren: () => import('./../../features/timeseries-exporter/timeseries-exporter.module').then(m => m.TimeseriesExporterModule),
            data: {
              title: 'Timeseries Exporter'
            }
          },
          {
            path: 'data/broker-bic-map',
            loadChildren: () => import('./../../features/broker-bic-map/broker-bic-map.module').then(m => m.BrokerBicMapModule),
            data: {
              title: 'Brokert BIC Map'
            }
          },
          // Order Book
          {
            path: 'orderbook',
            loadChildren: () => import('./../../features/order-book/order-book.module').then(m => m.OrderBookModule),
            data: {
              title: 'Order Book'
            }
          },
          // S&R Dashboards
          {
            path: 'snr',
            loadChildren: () => import('./../../features/snr-dashboards/snr-dashboards.module').then(m => m.SNRDashboardsModule),
            data: {
              title: 'Strategy & Research'
            }
          },
          // Commissions
          {
            path: 'commissions',
            loadChildren: () => import('./../../features/commissions/commissions.module').then(m => m.CommissionsModule),
            data: {
              title: 'Commissions'
            }
          },
          // TradeName Helper
          {
            path: 'tradenames',
            loadChildren: () => import('./../../features/tradename-helper/tradename-helper.module').then(m => m.TradeNameHelperModule),
            data: {
              title: 'Tradename Helper'
            }
          },
          // Pricing Engine
          {
            path: 'pricing',
            loadChildren: () => import('./../../features/pricing-engine/pricing-engine.module').then(m => m.PricingEngineModule),
            data: {
              title: 'Portfolio Pricing'
            }
          },
          // Blotter
          {
            path: 'blotter',
            loadChildren: () => import('./../../features/blotter/blotter.module').then(m => m.BlotterModule),
            data: {
              title: 'Trade Blotters'
            }
          },
          // Pricers
          {
            path: 'pricers',
            loadChildren: () => import('./../../features/pricing-calculators/pricing-calculators.module').then(m => m.PricingCalculatorsModule),
            data: {
              title: 'Price Calculators'
            }
          },
          // Market Data Dashboards
          {
            path: 'dashboards',
            loadChildren: () => import('./../../features/market-data-dashboards/market-data-dashboard.module').then(m => m.MarketDataDashboardModule),
            data: {
              title: 'Market Data - Dashboards'
            }
          },
          {
            path: 'charting',
            loadChildren: () => import('./../../features/timeseries/timeseries.module').then(m => m.TimeseriesModule),
            data: {
              title: 'Charting'
            }
          },
          // Chart Packages
          {
            path: 'chart_packs',
            loadChildren: () => import('./../../features/research-charts/research-charts.module').then(m => m.ResearchChartsModule),
            data: {
              title: 'Chart Packs'
            }
          },
          // Asset Targets
          {
            path: 'asset_targets',
            loadChildren: () => import('./../../features/asset_targets/asset_targets.module').then(m => m.AssetTargetsModule),
            data: {
              title: 'Asset Targets'
            }
          },
          // Scenario Management
          {
            path: 'scenario_management',
            loadChildren: () => import('./../../features/scenario-management/scenario-management.module').then(m => m.ScenarioManagementModule),
            data: {
              title: 'Scenario Management'
            }
          },
          // Blue Pearl
          // {
          //   path: 'bluepearl',
          //   loadChildren: () => import('./../../features/bluepearl/bluepearl.module').then(m => m.BluePearlModule),
          //   data: {
          //     title: 'BluePearl'
          //   }
          // },    
          {
            path: 'ssnc-feed',
            loadChildren: () => import('./../../features/ssnc-feed/ssnc-feed.module').then(m => m.SSNCFeedModule),
            data: {
              title: 'BluePearl'
            }
          },

          {
            path: 'pnl-adjustments',
            loadChildren: () => import('./../../features/pnl-adjustments/pnl-adjustments.module').then(m => m.PnlAdjustmentsModule),
            data: {
              title: 'Pnl Adjustments'
            }
          },

          {
            path: 'scenario-analysis',
            loadChildren: () => import('./../../features/scenario-analysis/scenario-analysis.module').then(m => m.ScenarioAnalysisModule),
            data: {
              title: 'Scenario Analysis'
            }
          },
          {
            path: 'financing/rate-card',
            loadChildren: () => import('../../features/rate_card/rate-card.module').then(m => m.RateCardModule),
            data: {
              title: 'Rate Card'
            }
          },

          {
            path: 'execution-tagging',
            loadChildren: () => import('../../features/execution-tagging/execution-tagging.module').then(m => m.ExecutionTaggingModule),
            data: {
              title: 'Exection Tagging'
            }
          },
        ]
      }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PrivateRoutingModule {}