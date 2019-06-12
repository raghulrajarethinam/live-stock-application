import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { LiveStockService } from './livestock.service'
import { ToastrService } from 'ngx-toastr';
import { timer } from 'rxjs';
import { switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-live-stock',
  templateUrl: './livestock.component.html',
  styleUrls: ['./livestock.component.css']
})
export class LiveStockComponent implements OnInit {
  stock_symbol=[];
  stocks=[];
  stock_prices = [];
  stock_to_add: string;
  toastMessage: string;
  removable = true;
  stock_chart: Chart;
  subscription: Subscription;

  constructor(private livestockservice: LiveStockService, private toast: ToastrService) {
    this.stocks = [];
    this.stock_prices = [];
    this.removable = true;
  }

  ngOnInit() {
    this.initializeChart();
  }

  initializeChart(): void {
    this.stock_chart = new Chart('stock-chart', {
      type: 'horizontalBar',
      data: {
        labels: this.stocks,
        datasets: [{
          label: 'Market Value',
          data: this.stock_prices,
          backgroundColor:
            'rgba(5, 5, 5, 0.3)'
          ,
          borderColor:
            'rgba(10,10,10,0.6)'
          ,
          borderWidth: 1
        }]
      },
      options: {
        legend: { display: false },
        title: {
          text: "Live Stock Information",
          display: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: "Stock Rate"
            }
          }]
        }
      }
    });
    this.refreshAll();
  }
  addStock(): void {
    if (this.stock_to_add) {
      const index = this.stocks.indexOf(this.stock_to_add);
      if (index < 0) {
        this.livestockservice.getStockPrice(this.stock_to_add).subscribe(data => {
          if (data['companyName']) {
            this.stocks.push(data['companyName']);
            this.stock_prices.push(data['latestPrice']);
            this.stock_chart.update();
            this.stock_symbol.push(data['symbol']);
            this.toastMessage = 'Stock added successfully';
            this.toast.success(this.toastMessage, 'Stock Action');
          }
        },
          error => {
            this.toastMessage = 'Stock Not Found';
            this.toast.error(this.toastMessage, 'Stock Action');
          });
      } else {
        this.toastMessage = 'Stock Already added';
        this.toast.error(this.toastMessage, 'Stock Action');
      }
    }
    this.stock_to_add = '';
  }

  //Timer for 5 sec
  refreshAll(): void {
    this.subscription=timer(0, 5000).pipe(switchMap(()=>this.livestockservice.getMultipleStockPrice(this.stock_symbol))).subscribe(
      data=>{
          this.stock_symbol.forEach((item, index, arr)=>{
              this.stock_prices[index]=data[item]['price'];
          });
          console.log(this.stock_prices)
          this.stock_chart.update();
      }
    );
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }
  
  //Remove tocks from chart
  remove(stock_to_remove: string): void {
    const index = this.stocks.indexOf(stock_to_remove);
    if (index >= 0) {
      this.stocks.splice(index, 1);
      this.stock_prices.splice(index, 1);
      this.stock_symbol.splice(index, 1);
      this.stock_chart.update();
      this.toastMessage = 'Stock removed successfully';
      this.toast.info(this.toastMessage, 'Stock Action');
    }
  }

}
