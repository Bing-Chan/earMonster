import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{U as s,V as a,aG as t}from"./framework.5c9c0c81.js";const h='{"title":"logicOr","description":"","frontmatter":{"category":"@Math","alias":"or","related":"logicAnd, logicNot"},"headers":[{"level":2,"title":"Usage","slug":"usage"}],"relativePath":"component/use/math/logicOr.md","lastUpdated":1687165800078}',o={},e=t(`__VP_STATIC_START__<h1 id="logicor" tabindex="-1">logicOr <a class="header-anchor" href="#logicor" aria-hidden="true">#</a></h1><p><code>OR</code> conditions for refs.</p><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-hidden="true">#</a></h2><div class="language-ts"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> logicOr <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vueuse/math&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> whenever <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vueuse/core&#39;</span>

<span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> b <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>

<span class="token function">whenever</span><span class="token punctuation">(</span><span class="token function">logicOr</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;either a or b is truthy!&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div>__VP_STATIC_END__`,4),p=[e];function c(l,r,i,u,k,d){return s(),a("div",null,p)}var f=n(o,[["render",c]]);export{h as __pageData,f as default};
