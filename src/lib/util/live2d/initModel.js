/*****************************************************************************************************
 く__,.ヘヽ.　　　　/　,ー､ 〉
 　　　　　＼ ', !-─‐-i　/　/´
 　　　 　 ／｀ｰ'　　　 L/／｀ヽ､                 Live2D Widget Setting
 　　 　 /　 ／,　 /|　 ,　 ,　　　 ',               Version 2.0.0
 　　　ｲ 　/ /-‐/　ｉ　L_ ﾊ ヽ!　 i                     Konata
 　　　 ﾚ ﾍ 7ｲ｀ﾄ　 ﾚ'ｧ-ﾄ､!ハ|　 |
 　　　　 !,/7 '0'　　 ´0iソ| 　 |　　　
 　　　　 |.从"　　_　　 ,,,, / |./ 　 |      Add Live2D widget in your website.
 　　　　 ﾚ'| i＞.､,,__　_,.イ / 　.i 　|
 　　　　　 ﾚ'| | / k_７_/ﾚ'ヽ,　ﾊ.　|       Thanks:
 　　　　　　 | |/i 〈|/　 i　,.ﾍ |　i　|    fghrsh / https://www.fghrsh.net/post/123.html
 　　　　　　.|/ /　ｉ： 　 ﾍ!　　＼　|       journey-ad / https://github.com/journey-ad/live2d_src
 　　　 　 　 kヽ>､ﾊ 　 _,.ﾍ､ 　 /､!         xiazeyu / https://github.com/xiazeyu/live2d-widget.js
 　　　　　　 !'〈//｀Ｔ´', ＼ ｀'7'ｰr'      Cubism Web Framework & All model authors.
 　　　　　　 ﾚ'ヽL__|___i,___,ンﾚ|ノ
 　　　　　 　　　ﾄ-,/　|___./
 　　　　　 　　　'ｰ'　　!_,.
 ****************************************************************************************************/
const live2d_settings = {
	// basic
	modelUrl: '/live2d/models', // URL of a directory which consists of all model folder. NO slash in the end
	tipsMessage: '', // message tips file. Can leave blank
	// model
	modelName: 'hiyori', // default model name when first visit website
	modelRandMode: false, // random switching model
	preLoadMotion: true, // weather preload motion file. ONLY valid for model3 file,
	// not preloading may increase model loading speed, but it may cause jank when trigger motion.
	tryWebp: false, // if broswer support WebP format, will try to load Webp texture first,
	// eg. origin texture file is klee.8192/texture_00.png, if enabled, will load klee.8192/texture_00.png.webp FIRST
	// will fallback to load origin file if any error occured
	// tool menu
	showToolMenu: false, // show tools
	canCloseLive2d: false, // show close button
	canSwitchModel: false, // show switch button
	canSwitchHitokoto: false, // show switch Hitokoto button
	canTakeScreenshot: false, // show screenshot button
	canTurnToHomePage: false, // show home button
	canTurnToAboutPage: false, // show about button
	showVolumeBtn: false, // show volume control button, you could implement other logic yourself
	// message tips
	showHitokoto: false, // show Hitokoto when inactive for 30 seconds
	hitokotoAPI: '', // Hitokoto API, can be 'hitokoto.cn'(default), 'lwl12.com', 'jinrishici.com', 'fghrsh.net'
	showWelcomeMessage: false, // show welcome message
	showF12OpenMsg: false, // show message when open console
	showCopyMessage: false, // show copy message. By default it watching copy operation inside '#articleContent' element,
	// if your article content is not under this tag, you could search and modify it below.
	// style
	live2dHeight: -1, // height of Live2D model, NO 'px' in the end
	live2dWidth: -1, // width of Live2D model, NO 'px' in the end
	minWidth: 'disable', // hide model when window width less than setting, eg, '1040px' (Recommend) or 'disable'
	edgeSide: 'right:0', // position of model, eg, 'left:0' or 'right:30', can be override by model setting
	// misc
	debug: true, // global debug setting
	debugMousemove: false, // log cursor postion to console, valid if debug is true
	logMessageToConsole: true // log message tips to console
	//'l2dVersion': '5.2.00',                      // script version
	//'homePageUrl': 'auto',  // homepage, could be URL or 'auto'
	//'aboutPageUrl': 'https://github.com/Konata09/Live2dOnWeb/', // about page
	//'screenshotCaptureName': 'bronyaMoe.png',   // filename of screenshot, eg, 'live2d.png'
};

// 模型列表
const live2d_models = [
	{
		name: 'hiyori',
		version: 3 // Use 3 for Cubism 3/4
	}
];
/****************************************************************************************************/

const getSS = (k) => {
	try {
		return sessionStorage.getItem(k);
	} catch (e) {
		return null;
	}
};
String.prototype.render = function (context) {
	const tokenReg = /(\\)?{([^{}\\]+)(\\)?}/g;
	return this.replace(tokenReg, function (word, slash1, token, slash2) {
		if (slash1 || slash2) {
			return word.replace('\\', '');
		}
		const variables = token.replace(/\s/g, '').split('.');
		let currentObject = context;
		let i, length, variable;

		for (i = 0, length = variables.length; i < length; ++i) {
			variable = variables[i];
			currentObject = currentObject[variable];
			if (currentObject === undefined || currentObject === null) return '';
		}
		return currentObject;
	});
};
const $$ = (selector) => {
	try {
		const e = document.querySelectorAll(selector);
		if (e.length === 1) {
			return e[0];
		} else return Array.from(e);
	} catch (e) {
		console.error(e);
		return null;
	}
};
const re = /x/;
console.log(re);
const live2dId2 = 'live2d2';
const live2dId4 = 'live2d4';
const model = $$('#model-container');

function testWebP() {
	return new Promise((res) => {
		const webP = new Image();
		webP.src =
			'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
		webP.onload = webP.onerror = () => {
			res(webP.height === 2);
		};
	});
}

const addStyle = (() => {
	const style = document.createElement('style');
	document.head.append(style);
	return (styleString) => (style.textContent = styleString);
})();

function changePosition(position) {
	if (position === 'left') {
		model.style.right = 'unset';
		model.style.left = live2d_settings.edgeSide.split(':')[1];
	} else if (position === 'right') {
		model.style.left = 'unset';
		model.style.right = live2d_settings.edgeSide.split(':')[1];
	} else {
		model.style.left = '';
		model.style.right = '';
	}
}

function initModel() {
	/* Load style sheet */
	addStyle(modelStyle);
	if (getSS('modelHide') === '1') {
		model.classList.add('hide');
		return;
	} else if (window.innerWidth <= Number(live2d_settings.minWidth.replace('px', ''))) {
		model.classList.add('hide');
		return;
	} else {
		model.classList.remove('hide');
	}
	/* console welcome message */
	//console.log("\u304f__,.\u30d8\u30fd.\u3000\u3000\u3000\u3000/\u3000,\u30fc\uff64 \u3009\n\u3000\u3000\u3000\u3000\u3000\uff3c ', !-\u2500\u2010-i\u3000/\u3000/\u00b4\n\u3000\u3000\u3000 \u3000 \uff0f\uff40\uff70'\u3000\u3000\u3000 L/\uff0f\uff40\u30fd\uff64\n\u3000\u3000 \u3000 /\u3000 \uff0f,\u3000 /|\u3000 ,\u3000 ,\u3000\u3000\u3000 ',\n\u3000\u3000\u3000\uff72 \u3000/ /-\u2010/\u3000\uff49\u3000L_ \uff8a \u30fd!\u3000 i\n\u3000\u3000\u3000 \uff9a \uff8d 7\uff72\uff40\uff84\u3000 \uff9a'\uff67-\uff84\uff64!\u30cf|\u3000 |\n\u3000\u3000\u3000\u3000 !,/7 '0'\u3000\u3000 \u00b40i\u30bd| \u3000 |\u3000\u3000\u3000\n\u3000\u3000\u3000\u3000 |.\u4ece\"\u3000\u3000_\u3000\u3000 ,,,, / |./ \u3000 |\n\u3000\u3000\u3000\u3000 \uff9a'| i\uff1e.\uff64,,__\u3000_,.\u30a4 / \u3000.i \u3000|\n\u3000\u3000\u3000\u3000\u3000 \uff9a'| | / k_\uff17_/\uff9a'\u30fd,\u3000\uff8a.\u3000|\n\u3000\u3000\u3000\u3000\u3000\u3000 | |/i \u3008|/\u3000 i\u3000,.\uff8d |\u3000i\u3000|\n\u3000\u3000\u3000\u3000\u3000\u3000.|/ /\u3000\uff49\uff1a \u3000 \uff8d!\u3000\u3000\uff3c\u3000|\n\u3000\u3000\u3000 \u3000 \u3000 k\u30fd>\uff64\uff8a \u3000 _,.\uff8d\uff64 \u3000 /\uff64!\n\u3000\u3000\u3000\u3000\u3000\u3000 !'\u3008//\uff40\uff34\u00b4', \uff3c \uff40'7'\uff70r'\n\u3000\u3000\u3000\u3000\u3000\u3000 \uff9a'\u30fdL__|___i,___,\u30f3\uff9a|\u30ce\n\u3000\u3000\u3000\u3000\u3000 \u3000\u3000\u3000\uff84-,/\u3000|___./\n\u3000\u3000\u3000\u3000\u3000 \u3000\u3000\u3000'\uff70'\u3000\u3000!_,.:\nLive2D \u770b\u677f\u5a18 v" + live2d_settings.l2dVersion + " / Konata");

	if (live2d_settings.live2dHeight > 0 && live2d_settings.live2dWidth > 0) {
		$$(`#${live2dId2}`).setAttribute('height', live2d_settings.live2dHeight);
		$$(`#${live2dId2}`).setAttribute('width', live2d_settings.live2dWidth);
		$$(`#${live2dId4}`).setAttribute('height', live2d_settings.live2dHeight);
		$$(`#${live2dId4}`).setAttribute('width', live2d_settings.live2dWidth);
	}

	window.modelResize = () => {
		if (getSS('modelHide') !== '1')
			window.innerWidth <= Number(live2d_settings.minWidth.replace('px', ''))
				? model.classList.add('hide')
				: model.classList.remove('hide');
	};

	if (live2d_settings.minWidth !== 'disable') {
		modelResize();
		window.addEventListener('resize', modelResize);
	}

	live2d_settings.homePageUrl =
		live2d_settings.homePageUrl === 'auto'
			? window.location.protocol + '//' + window.location.hostname + '/'
			: live2d_settings.homePageUrl;

	if (live2d_settings.tipsMessage)
		window
			.fetch(live2d_settings.tipsMessage)
			.then((res) => res.json())
			.then((resjson) => loadTipsMessage(resjson));

	const modelName = live2d_settings.modelName;

	window.live2dv4.setPreLoadMotion(live2d_settings.preLoadMotion);
	window.live2dv2.debug = live2d_settings.debug;
	window.live2dv4.debug = live2d_settings.debug;
	window.live2dv2.debugMousemove = live2d_settings.debug && live2d_settings.debugMousemove;
	window.live2dv4.debugMousemove = live2d_settings.debug && live2d_settings.debugMousemove;
	if (live2d_settings.tryWebp) {
		testWebP()
			.then((r) => (window.webpReady = r))
			.then(() => {
				if (window.webpReady === true)
					console.log('[tips] Your browser support WebP format. Try to load WebP texture first.');
				else console.log('[tips] Your browser do not support WebP format.');
				loadModel(modelName);
			});
	} else {
		loadModel(modelName);
	}
}

function loadModel(modelName) {
	live2d_settings.debug && console.log(`[tips] ${modelName}`);
	let modelVersion = 3;
	// 在配置中找到要加载模型的版本
	for (let model of live2d_models) {
		if (model.name === modelName) {
			modelVersion = model.version;
			changePosition(model.position);
			break;
		}
	}
	// 如果要加载的模型版本不同，先释放之前的SDK并隐藏canvas
	if (window.live2dCurrentVersion !== modelVersion) {
		if (window.live2dCurrentVersion === 2) {
			window.live2dv2.release();
			$$(`#${live2dId2}`).style.display = 'none';
		} else {
			window.live2dv4.release();
			$$(`#${live2dId4}`).style.display = 'none';
		}
	}
	// 根据模型版本选择不同的SDK加载
	if (modelVersion === 2) {
		$$(`#${live2dId2}`).style.display = 'block';
		window.live2dv2.load(live2dId2, `${live2d_settings.modelUrl}/${modelName}/model.json`);
	} else if (window.live2dCurrentVersion === modelVersion) {
		window.live2dv4.change(`${live2d_settings.modelUrl}/${modelName}`, `${modelName}.model3.json`);
	} else {
		$$(`#${live2dId4}`).style.display = 'block';
		window.live2dv4.load(
			live2dId4,
			`${live2d_settings.modelUrl}/${modelName}`,
			`${modelName}.model3.json`
		);
	}

	window.live2dCurrentVersion = modelVersion;
}

const blobDownload = (blob) => {
	if (typeof blob == 'object' && blob instanceof Blob) {
		blob = URL.createObjectURL(blob); // 创建blob地址
	}
	const aLink = document.createElement('a');
	aLink.href = blob;
	aLink.download = live2d_settings.screenshotCaptureName || 'live2d.png'; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
	let event;
	if (window.MouseEvent) event = new MouseEvent('click');
	else {
		event = document.createEvent('MouseEvents');
		event.initMouseEvent(
			'click',
			true,
			false,
			window,
			0,
			0,
			0,
			0,
			0,
			false,
			false,
			false,
			false,
			0,
			null
		);
	}
	aLink.dispatchEvent(event);
};

const modelStyle = `
#model-container {

z-index:998;
font-size:0
}

#live2d2,#live2d4 {
position:relative;
display:none;
z-index:997
}
`;
initModel();
window.downloadCap = blobDownload;
window.initModel = initModel;

export { initModel };
