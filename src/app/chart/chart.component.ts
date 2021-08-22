import {Component, OnInit, AfterViewInit, OnChanges} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Chart, registerables} from 'chart.js';
import {ChartGraphModel} from '../models/chartGraph';
import * as Graphs from '../reducers/chart.actions';
import {ChartService} from '../services/chart.service';
import {getLineChartConfig} from './chart-js.utils';
import {Observable} from 'rxjs';

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  chart: Chart;
  ctx: CanvasRenderingContext2D;
  canvasLoaded = false;

  firstGraphList$: Observable<ChartGraphModel[]>;
  secondGraphList$: Observable<ChartGraphModel[]>;
  thirdGraphList$: Observable<ChartGraphModel[]>;

  firstGraphList: ChartGraphModel[];
  secondGraphList: ChartGraphModel[];
  thirdGraphList: ChartGraphModel[];

  constructor(private chartService: ChartService, private store: Store<any>) {
  }

  ngOnInit(): void {
    this.chartService.getToken().subscribe((val) => {
      const token = (<any> val).token;
      localStorage.setItem('jwt', token);

      this.store.dispatch(new Graphs.GetGraph());
      this.firstGraphList$ = this.store.pipe(select('firstGraphList'));

      this.store.dispatch(new Graphs.GetSecondGraph());
      this.secondGraphList$ = this.store.pipe(select('secondGraphList'));

      this.store.dispatch(new Graphs.GetThirdGraph());
      this.thirdGraphList$ = this.store.pipe(select('getSecondGraph$'));

      this.Charts();
    });
  }

  getCanvasElement(): void {
    const canvas = <HTMLCanvasElement> document.getElementById('graphsChart');
    if (canvas) {
      this.ctx = canvas?.getContext('2d');
      if (this.chart) {
        this.chart.destroy();
      }
      this.chart = new Chart(this.ctx, getLineChartConfig(this.firstGraphList || [], this.secondGraphList || [],
        this.thirdGraphList || [], this.ctx));
      this.canvasLoaded = true;
    }
  }

  Charts(): void {
    this.chartService
      .getChartGraphApi()
      .subscribe((value) => {
        this.firstGraphList = value;

        this.chartService
          .getSecondChartGraphApi()
          .subscribe((value2) => {
            this.secondGraphList = value2;

            this.chartService
              .getThirdChartGraphApi()
              .subscribe((value3) => {
                this.thirdGraphList = value3;
                this.getCanvasElement();
              });
          });
      });
  }

}
