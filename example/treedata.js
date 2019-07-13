/*组织树的元数据*/
export function getTree(data, rootCode,columns) {
    let treedata = [];
    //查找最顶层
    let len = data.length;
    if (isNotBlank(rootCode)) {
        for (let j = 0; j < len; j++) {
            data[j].title = data[j].title;
            if (data[j].id == rootCode) {
                treedata.push({
                    'id': data[j].id,
                    'parentId': data[j].parentId,
                    'name': data[j].name,
                    'age':  data[j].age,
                    'sex': data[j].sex,
                });
            }
        }
    } else {
        for (let j = 0; j < len; j++) {
            // console.log(data)
            if (data[j].parentId == "") {
                treedata.push({
                    'id': data[j].id,
                    'parentId': data[j].parentId,
                    'name': data[j].name,
                    'age':  data[j].age,
                    'sex': data[j].sex
                })
            }
        }
    }

    //找到跟最高层id相关的子子孙孙，并给子孙添加lev
    var treedataLevs = [];
    for (let h = 0, ls = treedata.length; h < ls; h++) {
        treedataLevs.push({
            treedataLev: sonsTree(data, treedata[h].id)
        });
    }
    for (let p = 0, lq = treedataLevs.length; p < lq; p++) {
        var treedataLev = treedataLevs[p].treedataLev;
        //找到最高层的lev
        var maxLev = 0;
        for (let i = 0, lt = treedataLev.length; i < lt; i++) {
            if (parseInt(treedataLev[i].lev) > maxLev) {
                maxLev = parseInt(treedataLev[i].lev);
            } else {
                maxLev = maxLev;
            }
        }
        //比较当前层和上一层的数据，然后做处理
        maxLev = maxLev > 0 ? maxLev : 1;
        var needLev = maxLev;
        var maxLevTree = [];
        var maxLevTreePrev = [];
        for (let m = 0; m < maxLev; m++) {
            maxLevTree = getLevArr(treedataLev, needLev);
            maxLevTreePrev = getLevArr(treedataLev, needLev - 1);
            for (var j = 0, lp = maxLevTreePrev.length; j < lp; j++) {
                maxLevTreePrev[j].children = new Array();
                for (var i = 0, lm = maxLevTree; i < lm.length; i++) {
                    if (maxLevTree[i].parentId == maxLevTreePrev[j].id) {
                        maxLevTreePrev[j].children.push(maxLevTree[i]);
                    }
                }
            }
            needLev--;
        }
        treedata[p].children = maxLevTreePrev;
    }
    //找出同一级的数据
    function getLevArr(arr, lev) {
        var newarr = [];
        for (let i = 0, la = arr.length; i < la; i++) {
            //这里对arr 的children 做处理
            arr.children = new Array();
            if (parseInt(arr[i].lev) == lev) {
                newarr.push(arr[i]);
            }
        }
        return newarr;
    }

    //给每个数据添加一个lev
    function sonsTree(arr, id) {
        var temp = [], lev = 0;
        var forFn = function (arr, id, lev) {
            for (var i = 0; i < arr.length; i++) {
                var item = arr[i];
                if (item.parentId == id) {
                    item.lev = lev;
                    temp.push(item);
                    forFn(arr, item.id, lev + 1);
                }
            }
        };
        forFn(arr, id, lev);
        return temp;
    }
    return treedata;
}


function isNotBlank(obj) {
    if (obj != null && obj != '' && obj != undefined && obj != 'undefined') {
        return true;
    }
    return false;
}