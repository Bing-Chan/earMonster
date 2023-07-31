!(function (t) {
	var e,
		h,
		n,
		v,
		o,
		i =
			'<svg><symbol id="icon-zuzhi" viewBox="0 0 1024 1024"><path d="M323.918367 898.612245a41.795918 41.795918 0 0 1-41.795918-41.795918V334.367347H161.959184c-36.216163 0-65.828571-26.164245-67.813878-59.141225L94.040816 271.673469V146.285714c0-34.627918 30.406531-62.693878 67.918368-62.693877h407.510204C606.981224 83.591837 637.387755 111.657796 637.387755 146.285714v125.387755c0 34.627918-30.406531 62.693878-67.918367 62.693878H365.714286v167.183673h229.877551v-14.628571c0-36.780408 26.164245-66.831673 59.141224-68.858776L658.285714 417.959184h208.979592c34.627918 0 62.693878 30.866286 62.693878 68.963265v91.95102c0 38.09698-28.065959 68.963265-62.693878 68.963266H658.285714c-32.705306 0-59.559184-27.54351-62.443102-62.693878H365.714286v229.877551h229.877551v-14.628571c0-36.780408 26.164245-66.831673 59.141224-68.858776L658.285714 731.428571h208.979592c34.627918 0 62.693878 30.866286 62.693878 68.963266v91.95102c0 38.09698-28.065959 68.963265-62.693878 68.963265H658.285714c-32.705306 0-59.559184-27.54351-62.443102-62.693877H323.918367z m522.44898-83.591837h-167.183674v62.693878h167.183674v-62.693878z m0-313.469388h-167.183674v62.693878h167.183674v-62.693878zM553.795918 167.183673H177.632653v83.591837h376.163265V167.183673z" fill="#222429" ></path></symbol><symbol id="icon-General-2-63" viewBox="0 0 1024 1024"><path d="M64 0H0v384h384V0H64z m256 320H64V64h256v256zM576 64V0H448v64h64v128h64zM448 192h64v64H448zM512 256h64v64H512zM448 320h64v64H448z" fill="#3A4047" ></path><path d="M128 128h128v128H128zM704 0h-64v384h384V0h-320z m256 320h-256V64h256v256z" fill="#3A4047" ></path><path d="M768 128h128v128h-128zM64 640H0v384h384v-384H64z m256 320H64v-256h256v256z" fill="#3A4047" ></path><path d="M128 768h128v128H128zM576 512h64v128H576zM832 448v64h-128v64h192V448zM960 448h64v128h-64zM896 640v64h128v-64h-64V576h-64zM960 896h64v-128h-128v64h64zM896 1024h128v-64h-64v-64h-64zM512 960H448v64h128v-128H512zM448 768h64v128H448zM768 832h128v64h-128zM640 768H576v128h64v-64h128v-128h-64v64zM704 960h128v64h-128zM448 640h128v64H448zM512 448H448v128h64V512h64V448zM256 448H192v64H128v64h128V512h64V448zM64 448H0v128h64V512h64V448zM640 448h64v64h-64zM640 640h64v64h-64zM640 896h64v64h-64zM768 640h64v64h-64zM320 512h64v64H320z" fill="#3A4047" ></path></symbol></svg>',
		c = (c = document.getElementsByTagName('script'))[c.length - 1].getAttribute('data-injectcss'),
		l = function (t, e) {
			e.parentNode.insertBefore(t, e);
		};
	if (c && !t.__iconfont__svg__cssinject__) {
		t.__iconfont__svg__cssinject__ = !0;
		try {
			document.write(
				'<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>'
			);
		} catch (t) {}
	}
	function d() {
		o || ((o = !0), n());
	}
	function a() {
		try {
			v.documentElement.doScroll('left');
		} catch (t) {
			return void setTimeout(a, 50);
		}
		d();
	}
	(e = function () {
		var t, e;
		((e = document.createElement('div')).innerHTML = i),
			(i = null),
			(t = e.getElementsByTagName('svg')[0]) &&
				(t.setAttribute('aria-hidden', 'true'),
				(t.style.position = 'absolute'),
				(t.style.width = 0),
				(t.style.height = 0),
				(t.style.overflow = 'hidden'),
				(e = t),
				(t = document.body).firstChild ? l(e, t.firstChild) : t.appendChild(e));
	}),
		document.addEventListener
			? ~['complete', 'loaded', 'interactive'].indexOf(document.readyState)
				? setTimeout(e, 0)
				: ((h = function () {
						document.removeEventListener('DOMContentLoaded', h, !1), e();
				  }),
				  document.addEventListener('DOMContentLoaded', h, !1))
			: document.attachEvent &&
			  ((n = e),
			  (v = t.document),
			  (o = !1),
			  a(),
			  (v.onreadystatechange = function () {
					'complete' == v.readyState && ((v.onreadystatechange = null), d());
			  }));
})(window);
