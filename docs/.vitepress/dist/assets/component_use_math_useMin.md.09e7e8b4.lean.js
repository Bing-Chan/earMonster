import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{U as s,V as a,aG as t}from"./framework.5c9c0c81.js";const f='{"title":"useMin","description":"","frontmatter":{"category":"@Math"},"headers":[{"level":2,"title":"Usage","slug":"usage"}],"relativePath":"component/use/math/useMin.md","lastUpdated":1687166009336}',e={},p=t(`__VP_STATIC_START__<h1 id="usemin" tabindex="-1">useMin <a class="header-anchor" href="#usemin" aria-hidden="true">#</a></h1><p>Reactive <code>Math.min</code>.</p><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-hidden="true">#</a></h2><div class="language-ts"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> useMin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vueuse/math&#39;</span>

<span class="token keyword">const</span> array <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> sum <span class="token operator">=</span> <span class="token function">useMin</span><span class="token punctuation">(</span>array<span class="token punctuation">)</span> <span class="token comment">// Ref&lt;1&gt;</span>
</code></pre></div><div class="language-ts"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> useMin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vueuse/math&#39;</span>

<span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> b <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> sum <span class="token operator">=</span> <span class="token function">useMin</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token comment">// Ref&lt;1&gt;</span>
</code></pre></div>__VP_STATIC_END__`,5),o=[p];function c(u,r,l,i,k,d){return s(),a("div",null,o)}var h=n(e,[["render",c]]);export{f as __pageData,h as default};
