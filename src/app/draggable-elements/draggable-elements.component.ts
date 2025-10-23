import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import 'highcharts/modules/draggable-points';

interface Element {
  id: number;
  name: string;
  description: string;
  color: string;
}

@Component({
  selector: 'app-draggable-elements',
  standalone: true,
  imports: [CommonModule, FormsModule, HighchartsChartModule],
  templateUrl: './draggable-elements.component.html',
  styleUrl: './draggable-elements.component.css'
})
export class DraggableElementsComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  updateFlag = false;
  chartRef?: Highcharts.Chart;

  // Element data
  elements: Element[] = [
    { id: 1, name: 'Element 1', description: 'First element', color: '#3498db' },
    { id: 2, name: 'Element 2', description: 'Second element', color: '#2ecc71' },
    { id: 3, name: 'Element 3', description: 'Third element', color: '#f39c12' },
    { id: 4, name: 'Element 4', description: 'Fourth element', color: '#e74c3c' }
  ];

  // CRUD menu state
  showMenu = false;
  menuX = 0;
  menuY = 0;
  selectedElement: Element | null = null;
  selectedIndex: number = -1;

  // Form state
  showForm = false;
  formMode: 'create' | 'update' | 'view' = 'create';
  formData: Partial<Element> = {};
  nextId = 5;

  ngOnInit() {
    this.initChart();
  }

  initChart() {
    const component = this;

    this.chartOptions = {
      chart: {
        type: 'line',
        height: 350,
        spacing: [60, 50, 50, 50],
        events: {
          load: function() {
            component.chartRef = this;
          }
        }
      },
      title: {
        text: 'Draggable Elements Sequence',
        style: {
          fontSize: '18px',
          fontWeight: 'bold'
        }
      },
      subtitle: {
        text: 'Click on elements to access CRUD menu • Drag to reorder'
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      xAxis: {
        visible: false,
        min: -0.5,
        max: this.elements.length - 0.5
      },
      yAxis: {
        visible: false,
        min: -1,
        max: 1
      },
      tooltip: {
        enabled: true,
        useHTML: true,
        backgroundColor: '#ffffff',
        borderColor: '#cccccc',
        borderRadius: 8,
        borderWidth: 1,
        shadow: true,
        style: {
          color: '#333333',
          fontSize: '13px'
        },
        formatter: function() {
          const point = (this as any).point;
          return `
            <div style="padding: 12px; background: #ffffff; border-radius: 6px;">
              <div style="font-weight: bold; font-size: 14px; color: #2c3e50; margin-bottom: 6px;">${point.name}</div>
              <div style="color: #555555; margin-bottom: 4px;">${point.description}</div>
              <div style="font-size: 11px; color: #7f8c8d; padding-top: 4px; border-top: 1px solid #ecf0f1;">
                Position: #${point.orderNumber}
              </div>
            </div>
          `;
        }
      },
      plotOptions: {
        series: {
          dragDrop: {
            draggableX: true,
            draggableY: false,
            dragPrecisionX: 1,
            liveRedraw: false,
            dragMinX: 0,
            dragMaxX: this.elements.length - 1
          },
          stickyTracking: false,
          point: {
            events: {
              click: function(e: any) {
                component.onElementClick(this as any, e);
              },
              drop: function(e: any) {
                component.onElementDrop(e);
                // Return false to prevent default Highcharts handling
                return false;
              },
              dragStart: function(e: any) {
                console.log('Drag started for:', (this as any).name);
                // Prevent hiding during drag
                return true;
              }
            }
          },
          cursor: 'pointer',
          marker: {
            enabled: true,
            symbol: 'square',
            radius: 40,
            lineWidth: 3,
            lineColor: '#ffffff',
            states: {
              hover: {
                radius: 42,
                lineWidth: 4
              }
            }
          },
          dataLabels: {
            enabled: true,
            useHTML: true,
            formatter: function() {
              const point = (this as any).point;
              return `
                <div style="text-align: center; width: 100px; pointer-events: none;">
                  <div style="font-size: 13px; font-weight: bold; color: #2c3e50; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${point.name}</div>
                  <div style="font-size: 10px; color: #7f8c8d; margin-top: 2px;">#${point.orderNumber}</div>
                </div>
              `;
            },
            y: -55,
            allowOverlap: false,
            padding: 5,
            style: {
              textOutline: 'none'
            }
          },
          lineWidth: 3,
          color: '#95a5a6'
        }
      },
      series: [{
        type: 'line',
        name: 'Elements',
        data: this.generateChartData()
      }]
    };
  }

  generateChartData() {
    return this.elements.map((el, index) => ({
      x: index,
      y: 0,
      id: el.id.toString(),
      name: el.name,
      description: el.description,
      color: el.color,
      orderNumber: index + 1,
      marker: {
        fillColor: el.color
      }
    } as any));
  }

  updateChart() {
    if (this.chartRef) {
      const series = this.chartRef.series[0];
      const newData = this.generateChartData();
      
      console.log('Updating chart with data:', newData.map(d => d.name)); // Debug
      
      // Update xAxis max
      this.chartRef.xAxis[0].update({
        max: this.elements.length - 0.5,
        min: -0.5
      }, false);
      
      // Update dragMaxX constraint
      if (this.chartOptions.plotOptions?.series?.dragDrop) {
        this.chartOptions.plotOptions.series.dragDrop.dragMaxX = this.elements.length - 1;
      }
      
      // Update series data without animation for immediate swap
      series.setData(newData as any, true, false);
      
      // Force redraw
      this.chartRef.redraw(false);
    }
  }

  onElementClick(point: any, event: any) {
    event.preventDefault();
    
    // Find element by ID
    const elementId = parseInt(point.id);
    const index = this.elements.findIndex(el => el.id === elementId);
    
    if (index !== -1) {
      this.selectedElement = this.elements[index];
      this.selectedIndex = index;
      
      // Position menu near the clicked point
      this.menuX = event.pageX || event.clientX;
      this.menuY = event.pageY || event.clientY;
      this.showMenu = true;
    }
  }

  onElementDrop(e: any) {
    // Prevent default behavior
    e.preventDefault?.();
    
    const newX = Math.round(e.newPoint.x);
    const oldX = Math.round(e.target.x);
    
    console.log('Drop event - oldX:', oldX, 'newX:', newX); // Debug log
    
    if (newX !== oldX && newX >= 0 && newX < this.elements.length) {
      // Find elements by their IDs instead of positions
      const draggedId = parseInt(e.target.id);
      const draggedIndex = this.elements.findIndex(el => el.id === draggedId);
      
      if (draggedIndex !== -1 && newX !== draggedIndex) {
        // Swap elements at draggedIndex and newX positions
        const temp = this.elements[draggedIndex];
        this.elements[draggedIndex] = this.elements[newX];
        this.elements[newX] = temp;
        
        console.log('Swapped elements:', this.elements[draggedIndex].name, '<->', this.elements[newX].name);
        
        // Force immediate chart update
        this.updateChart();
      }
    }
  }

  closeMenu() {
    this.showMenu = false;
    this.selectedElement = null;
    this.selectedIndex = -1;
  }

  // CRUD Operations
  onCreate() {
    this.formMode = 'create';
    this.formData = {
      name: '',
      description: '',
      color: '#3498db'
    };
    this.showForm = true;
    this.closeMenu();
  }

  onRead() {
    if (this.selectedElement) {
      this.formMode = 'view';
      this.formData = { ...this.selectedElement };
      this.showForm = true;
      this.closeMenu();
    }
  }

  onUpdate() {
    if (this.selectedElement) {
      this.formMode = 'update';
      // Copy all properties to formData for editing
      this.formData = {
        id: this.selectedElement.id,
        name: this.selectedElement.name,
        description: this.selectedElement.description,
        color: this.selectedElement.color
      };
      this.showForm = true;
      this.closeMenu();
    }
  }

  onDelete() {
    if (this.selectedElement && confirm(`Delete "${this.selectedElement.name}"?`)) {
      this.elements = this.elements.filter(el => el.id !== this.selectedElement!.id);
      this.updateChart();
      this.closeMenu();
    }
  }

  // Form handlers
  submitForm() {
    if (this.formMode === 'create') {
      const newElement: Element = {
        id: this.nextId++,
        name: this.formData.name || 'New Element',
        description: this.formData.description || '',
        color: this.formData.color || '#3498db'
      };
      this.elements.push(newElement);
      this.updateChart();
    } else if (this.formMode === 'update') {
      // Find element by the ID stored in formData
      const elementId = this.formData.id;
      const index = this.elements.findIndex(el => el.id === elementId);
      
      if (index !== -1) {
        // Update element with new values from form
        this.elements[index] = {
          id: this.elements[index].id,
          name: this.formData.name || this.elements[index].name,
          description: this.formData.description !== undefined ? this.formData.description : this.elements[index].description,
          color: this.formData.color || this.elements[index].color
        };
        console.log('Updated element:', this.elements[index]); // Debug log
        this.updateChart();
      } else {
        console.error('Element not found for update. ID:', elementId);
      }
    }
    this.closeForm();
  }

  closeForm() {
    this.showForm = false;
    this.formData = {};
    this.selectedElement = null;
    this.selectedIndex = -1;
  }

  chartCallback: Highcharts.ChartCallbackFunction = (chart) => {
    this.chartRef = chart;
  }
}
