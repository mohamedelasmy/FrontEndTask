import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeTableModule } from 'primeng/treetable';
import { TreeNode } from 'primeng/api';
import { HttpClient } from '@angular/common/http';

interface Column {
  field: string;
  header: string;
}

interface ZoneData {
  id: number;
  nameEn: string;
  nameAr: string;
  children: ZoneData[];
}

interface MockDataResponse {
  category: string;
  message: string;
  payload: ZoneData[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TreeTableModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  files: TreeNode[] = [];
  cols: Column[] = [];
  loading: boolean = true;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    try {
      const [filesData, columnsData] = await Promise.all([
        this.getFilesData(),
        this.getColumnsData()
      ]);

      this.files = filesData;
      this.cols = columnsData;
      this.loading = false;
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error loading data:', error);
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  /**
   * Fetch data using Promise
   * Loads data from mock-data.json file
   */
  private getFilesData(): Promise<TreeNode[]> {
    return new Promise((resolve, reject) => {
      this.http.get<MockDataResponse>('data/mock-data.json').subscribe({
        next: (response) => {
          const treeNodes = this.transformToTreeNodes(response.payload);
          resolve(treeNodes);
        },
        error: (error) => {
          console.error('Error loading mock data:', error);
          reject(error);
        }
      });
    });
  }

  private getColumnsData(): Promise<Column[]> {
    return new Promise((resolve) => {
      const columns: Column[] = [
        { field: 'name', header: 'Name (English)' },
        { field: 'nameAr', header: 'Name (Arabic)' },
        { field: 'id', header: 'ID' }
      ];
      resolve(columns);
    });
  }

  private transformToTreeNodes(zones: ZoneData[]): TreeNode[] {
    return zones.map(zone => this.convertZoneToTreeNode(zone));
  }

  private convertZoneToTreeNode(zone: ZoneData): TreeNode {
    return {
      data: {
        name: zone.nameEn,
        nameAr: zone.nameAr,
        id: zone.id
      },
      children: zone.children?.length > 0
        ? zone.children.map(child => this.convertZoneToTreeNode(child))
        : undefined
    };
  }
}
