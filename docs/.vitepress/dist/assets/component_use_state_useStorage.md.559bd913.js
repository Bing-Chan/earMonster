import{_ as n,W as s,Z as a,aD as t}from"./plugin-vue_export-helper.1f080e1f.js";const f='{"title":"useStorage","description":"","frontmatter":{"category":"State","related":"useLocalStorage, useSessionStorage, useStorageAsync"},"headers":[{"level":2,"title":"Usage","slug":"usage"},{"level":2,"title":"Merge Defaults","slug":"merge-defaults"},{"level":2,"title":"Custom Serialization","slug":"custom-serialization"}],"relativePath":"component/use/state/useStorage.md","lastUpdated":1687165594943}',e={},o=t(`<h1 id="usestorage" tabindex="-1">useStorage <a class="header-anchor" href="#usestorage" aria-hidden="true">#</a></h1><p>Reactive <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" target="_blank" rel="noopener noreferrer">LocalStorage</a>/<a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage" target="_blank" rel="noopener noreferrer">SessionStorage</a></p><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-hidden="true">#</a></h2><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>When using with Nuxt 3, this functions will <strong>NOT</strong> be auto imported in favor of Nitro&#39;s built-in <a href="https://nitro.unjs.io/guide/storage" target="_blank" rel="noopener noreferrer"><code>useStorage()</code></a>. Use explicit import if you want to use the function from VueUse.</p></div><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> useStorage <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vueuse/core&#39;</span>

<span class="token comment">// bind object</span>
<span class="token keyword">const</span> state <span class="token operator">=</span> <span class="token function">useStorage</span><span class="token punctuation">(</span><span class="token string">&#39;my-store&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> hello<span class="token operator">:</span> <span class="token string">&#39;hi&#39;</span><span class="token punctuation">,</span> greeting<span class="token operator">:</span> <span class="token string">&#39;Hello&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// bind boolean</span>
<span class="token keyword">const</span> flag <span class="token operator">=</span> <span class="token function">useStorage</span><span class="token punctuation">(</span><span class="token string">&#39;my-flag&#39;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token comment">// returns Ref&lt;boolean&gt;</span>

<span class="token comment">// bind number</span>
<span class="token keyword">const</span> count <span class="token operator">=</span> <span class="token function">useStorage</span><span class="token punctuation">(</span><span class="token string">&#39;my-count&#39;</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token comment">// returns Ref&lt;number&gt;</span>

<span class="token comment">// bind string with SessionStorage</span>
<span class="token keyword">const</span> id <span class="token operator">=</span> <span class="token function">useStorage</span><span class="token punctuation">(</span><span class="token string">&#39;my-id&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;some-string-id&#39;</span><span class="token punctuation">,</span> sessionStorage<span class="token punctuation">)</span> <span class="token comment">// returns Ref&lt;string&gt;</span>

<span class="token comment">// delete data from storage</span>
state<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token keyword">null</span>
</code></pre></div><h2 id="merge-defaults" tabindex="-1">Merge Defaults <a class="header-anchor" href="#merge-defaults" aria-hidden="true">#</a></h2><p>By default, <code>useStorage</code> will use the value from storage if it presents and ignores the default value. Be aware that when you adding more properties to the default value, the key might be undefined if client&#39;s storage does not have that key.</p><div class="language-ts"><pre><code>localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">&#39;my-store&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;{&quot;hello&quot;: &quot;hello&quot;}&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> state <span class="token operator">=</span> <span class="token function">useStorage</span><span class="token punctuation">(</span><span class="token string">&#39;my-store&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> hello<span class="token operator">:</span> <span class="token string">&#39;hi&#39;</span><span class="token punctuation">,</span> greeting<span class="token operator">:</span> <span class="token string">&#39;hello&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> localStorage<span class="token punctuation">)</span>

<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>state<span class="token punctuation">.</span>value<span class="token punctuation">.</span>greeting<span class="token punctuation">)</span> <span class="token comment">// undefined, since the value is not presented in storage</span>
</code></pre></div><p>To solve that, you can enable <code>mergeDefaults</code> option.</p><div class="language-ts"><pre><code>localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">&#39;my-store&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;{&quot;hello&quot;: &quot;nihao&quot;}&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> state <span class="token operator">=</span> <span class="token function">useStorage</span><span class="token punctuation">(</span>
  <span class="token string">&#39;my-store&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> hello<span class="token operator">:</span> <span class="token string">&#39;hi&#39;</span><span class="token punctuation">,</span> greeting<span class="token operator">:</span> <span class="token string">&#39;hello&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  localStorage<span class="token punctuation">,</span>
  <span class="token punctuation">{</span> mergeDefaults<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span> <span class="token comment">// &lt;--</span>
<span class="token punctuation">)</span>

<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>state<span class="token punctuation">.</span>hello<span class="token punctuation">)</span> <span class="token comment">// &#39;nihao&#39;, from storage</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>state<span class="token punctuation">.</span>greeting<span class="token punctuation">)</span> <span class="token comment">// &#39;hello&#39;, from merged default value</span>
</code></pre></div><p>When setting it to true, it will perform a <strong>shallow merge</strong> for objects. You can pass a function to perform custom merge (e.g. deep merge), for example:</p><div class="language-ts"><pre><code><span class="token keyword">const</span> state <span class="token operator">=</span> <span class="token function">useStorage</span><span class="token punctuation">(</span>
  <span class="token string">&#39;my-store&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> hello<span class="token operator">:</span> <span class="token string">&#39;hi&#39;</span><span class="token punctuation">,</span> greeting<span class="token operator">:</span> <span class="token string">&#39;hello&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  localStorage<span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token function-variable function">mergeDefaults</span><span class="token operator">:</span> <span class="token punctuation">(</span>storageValue<span class="token punctuation">,</span> defaults<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">deepMerge</span><span class="token punctuation">(</span>defaults<span class="token punctuation">,</span> storageValue<span class="token punctuation">)</span> <span class="token punctuation">}</span> <span class="token comment">// &lt;--</span>
<span class="token punctuation">)</span>
</code></pre></div><h2 id="custom-serialization" tabindex="-1">Custom Serialization <a class="header-anchor" href="#custom-serialization" aria-hidden="true">#</a></h2><p>By default, <code>useStorage</code> will smartly use the corresponding serializer based on the data type of provided default value. For example, <code>JSON.stringify</code> / <code>JSON.parse</code> will be used for objects, <code>Number.toString</code> / <code>parseFloat</code> for numbers, etc.</p><p>You can also provide your own serialization function to <code>useStorage</code>:</p><div class="language-ts"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> useStorage <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vueuse/core&#39;</span>

<span class="token function">useStorage</span><span class="token punctuation">(</span>
  <span class="token string">&#39;key&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token keyword">undefined</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    serializer<span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token function-variable function">read</span><span class="token operator">:</span> <span class="token punctuation">(</span>v<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> v <span class="token operator">?</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
      <span class="token function-variable function">write</span><span class="token operator">:</span> <span class="token punctuation">(</span>v<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>
</code></pre></div><p>Please note when you provide <code>null</code> as the default value, <code>useStorage</code> can&#39;t assume the data type from it. In this case, you can provide a custom serializer or reuse the built-in ones explicitly.</p><div class="language-ts"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> StorageSerializers<span class="token punctuation">,</span> useStorage <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vueuse/core&#39;</span>

<span class="token keyword">const</span> objectLike <span class="token operator">=</span> <span class="token function">useStorage</span><span class="token punctuation">(</span><span class="token string">&#39;key&#39;</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> serializer<span class="token operator">:</span> StorageSerializers<span class="token punctuation">.</span>object <span class="token punctuation">}</span><span class="token punctuation">)</span>
objectLike<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token punctuation">{</span> foo<span class="token operator">:</span> <span class="token string">&#39;bar&#39;</span> <span class="token punctuation">}</span>
</code></pre></div>`,18),p=[o];function c(l,u,r,i,k,d){return s(),a("div",null,p)}var m=n(e,[["render",c]]);export{f as __pageData,m as default};