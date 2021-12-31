/**
* 公共工具类
**/
import html2Canvas from 'html2canvas';
import JsPDF from 'jspdf';
export class Util {
    static extend(target) {
        var len = arguments.length,
            index = 1,
            first = arguments[0];
        if (typeof target == 'boolean') {
            if (target) first = {};
            else {
                first = arguments[1];
                index = 2;
            }
        }
        for (; index < len; index++) {
            var o = arguments[index];
            for (let i in o) if (o[i] !== undefined) first[i] = o[i];
        }
        return first;
    }

    //递归实现 根据id查询id所有信息
    //@id  查找的id，
    //@list   原始Json数据
    static getTreeObj(list, id, value = 'id') {
        let _this = this
        for (let i = 0; i < list.length; i++) {
            let a = list[i]
            if (a[value] === id) {
                return a
            } else {
                if (a.children && a.children.length > 0) {
                    let res = _this.getTreeObj(a.children, id, value)
                    if (res) {
                        return res
                    }
                }
            }
        }
    }
    // parents:用于返回的数组，childNode:要查询的节点，treeData：json树形数据
    static getParentId(list, id) {
        for (let i in list) {
            if (list[i].value == id) {
                return [list[i].value]
            }
            if (list[i].children) {
                let node = this.getParentId(list[i].children, id);
                if (node !== undefined) {
                    return node.concat(list[i].value)
                }
            }
        }
    }
    static downloadPDF(id, title, w = 793, h = 1126.59) {
        var element = document.getElementById(id);
        html2Canvas(element, {
            // dpi: 300,
            logging: false,
            // background: '#fff',
            allowTaint: true,
            // taintTest: false,
            // async: false
        }).then(function (canvas) {
            var contentWidth = canvas.width;
            var contentHeight = canvas.height;

            // 一页pdf显示html页面生成的canvas高度;
            // var pageHeight = contentWidth / w * h;
            // 未生成pdf的html页面高度
            var leftHeight = contentHeight;
            // 页面偏移
            var position = 0;
            // html页面生成的canvas在pdf中图片的宽高
            var imgWidth = w - 4;
            var imgHeight = (w / contentWidth * contentHeight) - 4;
            var pageData = canvas.toDataURL('image/jpeg', 1.0);
            const t = w < h ? 'p' : 'l';
            var pdf = new JsPDF(t, 'pt', [w, h]);
            // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度
            // 当内容未超过pdf一页显示的范围，无需分页
            if (leftHeight < h) {
                pdf.addImage(pageData, 'JPEG', 2, 2, imgWidth, imgHeight);
            } else {
                while (leftHeight > 0) {
                    pdf.addImage(pageData, 'JPEG', 2, position, imgWidth, imgHeight);
                    leftHeight -= h + 2;
                    position -= h + 2;
                    // 避免添加空白页
                    if (leftHeight > h / 3) {
                        pdf.addPage();
                    }
                }
            }

            const name = timestampFlag(title);
            pdf.save(`${title}.pdf`);
        });
        function timestampFlag(title) {
            const yy = new Date().getFullYear();
            const mm = new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1;
            const dd = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate();
            return title + '-' + yy + '-' + mm + '-' + dd;
        }
    }
}
