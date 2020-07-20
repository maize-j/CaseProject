#ES6
##Promise
###什么是Promise
Promise是异步编程的一种解决方案，一般情况下是有异步操作时，使用promise进行封装

在什么情况下会处理异步事件？

网络请求。因为我们在封装一个网络请求的函数时，是不能立即拿到结果的，所以我们往往会传入另外一个函数没在数据请求成功时，将数据通过传入的函数调回去。如果只是简单的网络请求，那么这种方案不会给我们带来很大的麻烦，但是网络请求很复杂时，会出现回调地狱。例如：

	$.ajax('utl',function(data1){
        $.ajax('utl',function(data2){
            $.ajax('utl',function(data3){
                $.ajax('utl',function(data4){
                    console.log('data4')
                })
            })
        })
    })

###Promise的基本使用
使用setTimeOut函数模拟网络请求

Promise的基本语法为：

	new Promise((resolve, reject)=>{
		第一次网络请求函数{
			resolve()
		}
	}).then(()=>{
		第一次处理结果的代码
		
		return new Promise((resolve,reject)=>{
			第二次网络请求函数{
				resolve()
			}
		})
	}).then(()=>{
		第二次处理结果的代码
	})
以此类推，当原本有多层嵌套请求时，在每次处理结果的代码块内部写入下一次网络请求，请求的结果处理同样以then方法接在上一次处理结果的then方法后，这样就将原本的树形处理结构转变为链式处理结构。其中new Promise()所需要传入的参数为一个函数，该函数的两个参数resolve和reject也是两个函数，请求成功时调用resolve，请求失败调用reject

当请求有返回值时

	new Promise((resolve, reject)=>{
		setTimeOut(()=>{
			resolve('hello World')
			reject('hello Err')
		},1000)
	}).then((data)=>{
		//请求成功需要处理的代码放在这个位置
	}).catch((err)=>{
		//请求失败需要做出的处理
	})
其中then方法也可以传入两个参数，这两个参数分别代表两个函数，用于对请求成功和请求失败分别作出处理，当将err写在then中时，
不用写catch
	new Promise((resolve, reject)=>{
		setTimeOut(()=>{
			resolve('hello World')
			reject('hello Err')
		},1000)
	}).then((data)=>{
		//请求成功需要处理的代码放在这个位置
	},(err)=.{
		//请求失败需要做出的处理
	})
###Promise的三种状态

Promise的内容略微比较复杂，见LearnVueJs08

