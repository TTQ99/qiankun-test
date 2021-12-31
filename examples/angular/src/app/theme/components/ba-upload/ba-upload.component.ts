import { Component, ViewEncapsulation, OnInit, ElementRef, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { FileUploader } from 'ng2-file-upload';
import { CookieService } from 'ngx-cookie-service';
declare var Base64: any;

import { Language } from '../../../common/language';
import { BaseService } from 'src/app/pages/base-service';
import { AppToken } from '../../../common/app-token';

@Component({
  selector: 'app-ba-upload',
  templateUrl: './ba-upload.component.html',
  styleUrls: ['./ba-upload.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [CookieService, BaseService]
})
export class BaUploadComponent implements OnInit {

  constructor(
    private _elementRef: ElementRef,
    private cookieService: CookieService,

    private _baseService: BaseService
  ) { }

  @Output() downloadEvent = new EventEmitter();  //组件点击下载模板事件
  @Output() reSearchEvent = new EventEmitter();  //上传成功后的刷新事件
  @Input() date: any;
  @Input() text: any;
  public warnMsg = '';	//校验提示
  public resultflag = false;	//导入结果显示标识符
  public exportflag = true;		//上传下载显示标识符
  @ViewChild('downLoadTxt') eDownTxt: ElementRef;
  ngOnInit() {
  }

  /**
   * 下载模板
   */
  download() {
    let that = this;
    //把点击下载模板暴露组件调用者
    that.downloadEvent.emit();
  }

  /**
   * 实例化一个上传对象
   */
  public uploader: FileUploader = new FileUploader({
    url: "",
    method: "POST",
    itemAlias: "file",
    autoUpload: false
  });

  /**
   * 选择文件
   */
  selectedFileOnChanged(tag) {
    this.warnMsg = '';
    var eFile = tag.target || tag.srcElement;
    let file = eFile.files[0];
    //校验文件大小和格式
    if (file && file.size > 2 * 1024 * 1024) {
      this.warnMsg = "theme.excel.moretwom";
      return;
    }
    // 校验文件后缀名，并根据后缀名判断是否校验文件类型
    // 校验文件类型，默认为false
    let needVerifyType = false;
    if (file && file.name) {
      let fileName = file.name;
      let suffixName = fileName.slice(fileName.lastIndexOf(".") + 1).toLowerCase();
      if (suffixName != 'xls' && suffixName != 'xlsx') {
        needVerifyType = true;
      }
    }
    if (needVerifyType && file && file.type != 'application/vnd.ms-excel' && file.type != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      this.warnMsg = "theme.excel.fileTypeErr";
      this._elementRef.nativeElement.querySelector('.filePath').value = '';
      return;
    }
    var filePath = file ? file.name : '';
    this._elementRef.nativeElement.querySelector('.filePath').value = filePath;
  };

  /**
   * 确认上传
   */
  public exportResult: any = '导入失败！';    //resultStatus=2时的默认提示语
  public successNum: any = 0;  //导入成功条数
  public resultStatus: any = 0;  //上传结果的状态：0=成功，1=数据失败，2=模板不匹配或者数据为空
  public logUrl: any = "";  //日志下载地址
  public downText: any = '';
  public warningText = [];
  uploadFile(url, callback) {
    let that = this;
    let lang = Language.getLanguage();
    if (!this.uploader.queue[0]) return;
    this.uploader.queue[this.uploader.queue.length - 1]['url'] = url;
    this.uploader.queue[this.uploader.queue.length - 1]['headers'] = [
      { name: "X-XSRF-TOKEN", value: this.cookieService.get('XSRF-TOKEN') },
      { name: "X-Requested-With", value: "XMLHttpRequest" },
      { name: 'Accept-Language', value: lang },
    ];
    this.uploader.queue[this.uploader.queue.length - 1].onSuccess = function (response, status, headers) {  // 上传文件成功的回调
      // callback(JSON.parse(response), status, headers);
      callback(response, status, headers);
      if (status == 200 || status == 201) {
        try {
          let res = JSON.parse(response);
          that.resultflag = true;
          that.exportflag = false;
          if (res.length > 0) {
            that.resultStatus = 1;
            that.warningText = res;
            that.logUrl = res.fileLogPath;
            that.downText = res['error-info'];
            that.reSearchEvent.emit();
          } else {
            that.resultStatus = 0;
            // that.successNum = res.success || 0;
            that.reSearchEvent.emit();  //导入成功后刷新页面
          }
        } catch (error) {
          that.resultflag = true;
          that.exportflag = false;
          that.resultStatus = 0;
          that.reSearchEvent.emit();  //导入成功后刷新页面
        }
      }

    };
    this.uploader.queue[this.uploader.queue.length - 1].onError = function (response, status, headers) {  //上传文件失败的回调
      callback(response, status, headers);
      that.exportflag = false;
      that.resultflag = true;
      that.resultStatus = 2;
      if (status == 400) {
        // let base64 = new Base64();
        // that.exportResult= base64.decode(headers.status_msg)
        const err = JSON.parse(response);
        that.exportResult = err.message || '导入失败！';
      }
    }
    this.uploader.queue[this.uploader.queue.length - 1].upload(); // 开始上传
  }

  /**
   * 下载查看详情
   */
  downloadResult() {
    // window.open(this.logUrl, "_self");
    // window.open(this.logUrl, "_blank");
    let str = '';
    this.warningText.forEach(res => {
      str += res + '\r\n';
    });
    (window as any).download(str, '错误说明', "text/plain")
  }
}
