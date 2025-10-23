import { Routes } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { DraggableElementsComponent } from './draggable-elements/draggable-elements.component';


export const routes: Routes = [
  { path: '', component: DraggableElementsComponent },
  { path: 'chart', component: ChartComponent },
  // { path: 'draggable-elements', component: DraggableElementsComponent }
];
