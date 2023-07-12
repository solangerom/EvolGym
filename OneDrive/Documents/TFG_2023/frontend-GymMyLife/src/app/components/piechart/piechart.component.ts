import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})

export class PieChartComponent{
  pueblos_scrapeados: number = 30;

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['Pueblos Scrapeados'], ['Pueblos sin Scrapear']];
  public pieChartData: SingleDataSet = []
  public pieChartType: ChartType = 'pie';
  public pieChartColors = [
    {
      backgroundColor: ['rgba(0,255,0,0.3)', 'rgba(255,0,0,0.3)'],
    },
  ];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private adminService: AdminService,) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();

  }
  public ngOnInit(): void {
    this.getMunicipiosScrapeados()

}
    getMunicipiosScrapeados() {
    this.adminService.getMunicipiosScrapeados().subscribe(
      (response) => {
        // console.log('municipios scrapeados', response);
        this.pueblos_scrapeados = Number(response['data'][0]['porcentaje']);
        console.log('municipios scrapeados ', this.pueblos_scrapeados)
        this.pieChartData = [this.pueblos_scrapeados, 100 - this.pueblos_scrapeados]
      },
      (error) => {
        console.log('error is ', error);
      }
    );
  }
    
  }

