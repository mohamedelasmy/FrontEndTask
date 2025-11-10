import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface TreeNode {
  id: number;
  name: string;
  nameAr: string;
  children?: TreeNode[];
  expanded?: boolean;
  level?: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  visibleRows: TreeNode[] = [];
  currentPage = 1;
  pageSize = 5;
  pageSizeOptions = [5, 10, 25];
  treeData: TreeNode[] = [];

  constructor(private readonly http: HttpClient, private readonly cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    console.log('Loading data from data/mock-data.json');
    this.http.get<any>('data/mock-data.json').subscribe({
      next: (response) => {
        console.log('Response received:', response);
        this.treeData = this.mapToTreeNodes(response.payload);
        console.log('Tree data mapped:', this.treeData);
        this.updateVisibleRows();
        console.log('Visible rows:', this.visibleRows);
        console.log('Paged rows:', this.pagedRows);
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading data:', error);
      }
    });
  }

  private mapToTreeNodes(nodes: any[], level: number = 0): TreeNode[] {
    if (!nodes || !Array.isArray(nodes)) return [];

    return nodes.map(node => ({
      id: node.id,
      name: node.nameEn,
      nameAr: node.nameAr,
      level: level,
      expanded: false,
      children: node.children && node.children.length > 0
        ? this.mapToTreeNodes(node.children, level + 1)
        : undefined
    }));
  }

  updateVisibleRows() {
    this.visibleRows = this.flattenTree(this.treeData);
  }

  toggleNode(node: TreeNode) {
    node.expanded = !node.expanded;
    this.updateVisibleRows();
  }

  flattenTree(nodes: TreeNode[]): TreeNode[] {
    const result: TreeNode[] = [];
    for (const node of nodes) {
      result.push(node);
      if (node.expanded && node.children) {
        result.push(...this.flattenTree(node.children));
      }
    }
    return result;
  }

  get pagedRows(): TreeNode[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.visibleRows.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.visibleRows.length / this.pageSize);
  }

  get startItem(): number {
    return this.visibleRows.length === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
  }

  get endItem(): number {
    return Math.min(this.currentPage * this.pageSize, this.visibleRows.length);
  }

  get totalPagesDisplay(): number {
    return this.totalPages || 1;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  changePageSize(size: number) {
    this.pageSize = size;
    this.currentPage = 1;
  }

  hasChildren(node: TreeNode): boolean {
    return !!(node.children && node.children.length > 0);
  }
}
