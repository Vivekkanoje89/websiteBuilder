import { Component, OnInit } from '@angular/core';
// @ts-ignore
import grapesjs from 'grapesjs';
import 'grapesjs-preset-webpage';

@Component({
  selector: 'app-wb',
  templateUrl: './wb.component.html',
  styleUrls: ['./wb.component.scss']
})
export default class WbComponent implements OnInit {
  private _editor: any;
  constructor() { }

  get editor() {
    return this._editor;
  }

  ngOnInit() {
    this._editor = this.initializeEditor();
    this.editor.on('asset:add', () => {
      console.log('Asset add fired');
      // this.editor.runCommand('open-assets');
    });

    this.editor.on('component:mount', (model: any) => {
      this.editor.select(model);
      const openBl = this.editor.Panels.getButton('views', 'open-tm');
      openBl && openBl.set('active', 1)
    });    

    this.editor.on('asset:upload:response', (response: any) => {
      this.editor.AssetManager.add(response);
    });

  }
  private initializeEditor(): any {
    console.dir(window);
    return grapesjs.init({
      container: '#gjs',
      autorender: true,
      forceClass: false,
      components: [],
      style: '',
      plugins: ['gjs-preset-webpage'],
      pluginsOpts: {
        'gjs-preset-webpage': {
          navbarOpts: false,
          countdownOpts: false,
          formsOpts: false,
          blocksBasicOpts: {
            blocks: ['link-block', 'quote', 'image', 'video', 'text', 'column1', 'column2', 'column3', 'map'],
            flexGrid: false,
            stylePrefix: 'lala-'
          }
        }
      },
      assetManager: {
        uploadText: 'Add image through link or upload image',
        modalTitle: 'Select Image',
        openAssetsOnDrop: 0,
        inputPlaceholder: 'http://url/to/the/image.jpg',
        addBtnText: 'Add image',
        uploadFile: (e: any) => {
          const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
        },
        handleAdd: (textFromInput: any) => {
          this.editor.AssetManager.add(textFromInput);
        },
        autoAdd: true
      },
      canvas: {
        styles: [
          'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
          'https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css'
        ],
        scripts: ['https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js']
      }
    });
  }

}
