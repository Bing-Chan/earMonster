import{_ as s,W as n,Z as a,aD as t}from"./plugin-vue_export-helper.1f080e1f.js";const _='{"title":"useMax","description":"","frontmatter":{"category":"@Math"},"headers":[{"level":2,"title":"Usage","slug":"usage"}],"relativePath":"component/use/math/useMax.md","lastUpdated":1687165975308}',e={},p=t(`__VP_STATIC_START__<h1 id="usemax" tabindex="-1">useMax <a class="header-anchor" href="#usemax" aria-hidden="true">#</a></h1><p>Reactive <code>Math.max</code>.</p><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-hidden="true">#</a></h2><div class="language-ts"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> useMax <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vueuse/math&#39;</span>

<span class="token keyword">const</span> array <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> sum <span class="token operator">=</span> <span class="token function">useMax</span><span class="token punctuation">(</span>array<span class="token punctuation">)</span> <span class="token comment">// Ref&lt;4&gt;</span>
</code></pre></div><div class="language-ts"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> useMax <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vueuse/math&#39;</span>

<span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> b <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> sum <span class="token operator">=</span> <span class="token function">useMax</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token comment">// Ref&lt;3&gt;</span>
</code></pre></div>__VP_STATIC_END__`,5),o=[p];function c(u,r,l,k,i,d){return n(),a("div",null,o)}var h=s(e,[["render",c]]);export{_ as __pageData,h as default};