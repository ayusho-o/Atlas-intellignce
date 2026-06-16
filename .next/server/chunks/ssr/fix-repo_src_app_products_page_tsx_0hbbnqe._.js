module.exports=[33142,a=>{"use strict";var b=a.i(11745),c=a.i(54903),d=a.i(27086),e=a.i(82050);let f="#FF5A5F",g="#1F2430",h="#9CA3AF",i="#F7F7F7",j="#EBEBEB",k=a=>{let b=new Date;return b.setDate(b.getDate()-a),b.toISOString().slice(0,10)},l=a=>(0,b.jsx)("svg",{viewBox:"0 0 20 20",fill:"none",...a,children:(0,b.jsx)("path",{d:"M10 2c1 2.5-1 3.5-1 5.5 0 1 .8 1.5 1.5 1.5 1 0 1.5-1 1.5-2 2 1.5 3 3.5 3 5.5a5 5 0 11-10 0c0-3 1.5-4.5 2.5-6.5C8.3 4.5 9.2 3 10 2z",stroke:"currentColor",strokeWidth:"1.4",strokeLinejoin:"round"})}),m=a=>(0,b.jsxs)("svg",{viewBox:"0 0 20 20",fill:"none",...a,children:[(0,b.jsx)("circle",{cx:"9",cy:"9",r:"6",stroke:"currentColor",strokeWidth:"1.6"}),(0,b.jsx)("path",{d:"M14 14L18 18",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round"})]}),n=a=>(0,b.jsx)("svg",{viewBox:"0 0 20 20",fill:"none",...a,children:(0,b.jsx)("path",{d:"M10 2l1.4 4.6L16 8l-4.6 1.4L10 14l-1.4-4.6L4 8l4.6-1.4L10 2z",fill:"currentColor"})}),o=a=>(0,b.jsx)("svg",{viewBox:"0 0 20 20",fill:"none",...a,children:(0,b.jsx)("path",{d:"M4 10h12M11 5l5 5-5 5",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"})}),p=({filled:a,...c})=>(0,b.jsx)("svg",{viewBox:"0 0 20 20",...c,children:(0,b.jsx)("path",{d:"M10 4L17 14H3L10 4Z",fill:a?f:"none",stroke:a?f:h,strokeWidth:"1.6",strokeLinejoin:"round"})}),q=a=>(0,b.jsx)("svg",{viewBox:"0 0 20 20",fill:"none",...a,children:(0,b.jsx)("path",{d:"M3 8.5a5.5 5.5 0 015.5-5.5h3A5.5 5.5 0 0117 8.5v0a5.5 5.5 0 01-5.5 5.5H8l-3.5 2.5v-2.8A5.5 5.5 0 013 8.5z",stroke:"currentColor",strokeWidth:"1.4",strokeLinejoin:"round"})}),r=a=>(0,b.jsxs)("svg",{viewBox:"0 0 20 20",fill:"none",...a,children:[(0,b.jsx)("rect",{x:"3",y:"4.5",width:"14",height:"12",rx:"1.5",stroke:"currentColor",strokeWidth:"1.4"}),(0,b.jsx)("path",{d:"M3 8h14M6.5 3v3M13.5 3v3",stroke:"currentColor",strokeWidth:"1.4",strokeLinecap:"round"})]}),s=[{id:"all",label:"All",icon:a=>(0,b.jsxs)("svg",{viewBox:"0 0 20 20",fill:"none",...a,children:[(0,b.jsx)("rect",{x:"3",y:"3",width:"6",height:"6",rx:"1.2",stroke:"currentColor",strokeWidth:"1.5"}),(0,b.jsx)("rect",{x:"11",y:"3",width:"6",height:"6",rx:"1.2",stroke:"currentColor",strokeWidth:"1.5"}),(0,b.jsx)("rect",{x:"3",y:"11",width:"6",height:"6",rx:"1.2",stroke:"currentColor",strokeWidth:"1.5"}),(0,b.jsx)("rect",{x:"11",y:"11",width:"6",height:"6",rx:"1.2",stroke:"currentColor",strokeWidth:"1.5"})]})},{id:"chat",label:"Chat",icon:a=>(0,b.jsx)("svg",{viewBox:"0 0 20 20",fill:"none",...a,children:(0,b.jsx)("path",{d:"M3 9.5a6 6 0 016-6h2a6 6 0 010 12H7l-3 2.5v-3.2A6 6 0 013 9.5z",stroke:"currentColor",strokeWidth:"1.5",strokeLinejoin:"round"})})},{id:"code",label:"Code",icon:a=>(0,b.jsx)("svg",{viewBox:"0 0 20 20",fill:"none",...a,children:(0,b.jsx)("path",{d:"M7 5L3 10l4 5M13 5l4 5-4 5",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})},{id:"image",label:"Image",icon:a=>(0,b.jsxs)("svg",{viewBox:"0 0 20 20",fill:"none",...a,children:[(0,b.jsx)("rect",{x:"3",y:"4",width:"14",height:"12",rx:"1.5",stroke:"currentColor",strokeWidth:"1.5"}),(0,b.jsx)("circle",{cx:"7.5",cy:"8.5",r:"1.3",stroke:"currentColor",strokeWidth:"1.3"}),(0,b.jsx)("path",{d:"M4 14l4-4 3 3 2.5-2.5L16 14",stroke:"currentColor",strokeWidth:"1.3",strokeLinejoin:"round"})]})},{id:"video",label:"Video",icon:a=>(0,b.jsxs)("svg",{viewBox:"0 0 20 20",fill:"none",...a,children:[(0,b.jsx)("rect",{x:"3",y:"4",width:"14",height:"12",rx:"1.5",stroke:"currentColor",strokeWidth:"1.5"}),(0,b.jsx)("path",{d:"M8.5 7.5l4.5 2.5-4.5 2.5v-5z",fill:"currentColor"})]})},{id:"voice",label:"Voice",icon:a=>(0,b.jsx)("svg",{viewBox:"0 0 20 20",fill:"none",...a,children:(0,b.jsx)("path",{d:"M2 10h2M5 6v8M8 4v12M11 7v6M14 5v10M17 9v2",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})})},{id:"productivity",label:"Productivity",icon:a=>(0,b.jsxs)("svg",{viewBox:"0 0 20 20",fill:"none",...a,children:[(0,b.jsx)("circle",{cx:"10",cy:"10",r:"6.5",stroke:"currentColor",strokeWidth:"1.4"}),(0,b.jsx)("circle",{cx:"10",cy:"10",r:"3",stroke:"currentColor",strokeWidth:"1.4"}),(0,b.jsx)("circle",{cx:"10",cy:"10",r:"0.8",fill:"currentColor"})]})},{id:"search",label:"Search",icon:m},{id:"design",label:"Design",icon:a=>(0,b.jsx)("svg",{viewBox:"0 0 20 20",fill:"none",...a,children:(0,b.jsx)("path",{d:"M4 16l1-4 9-9 3 3-9 9-4 1z",stroke:"currentColor",strokeWidth:"1.4",strokeLinejoin:"round"})})},{id:"writing",label:"Writing",icon:a=>(0,b.jsxs)("svg",{viewBox:"0 0 20 20",fill:"none",...a,children:[(0,b.jsx)("rect",{x:"4",y:"3",width:"12",height:"14",rx:"1.5",stroke:"currentColor",strokeWidth:"1.4"}),(0,b.jsx)("path",{d:"M7 7h6M7 10h6M7 13h4",stroke:"currentColor",strokeWidth:"1.2",strokeLinecap:"round"})]})},{id:"music",label:"Music",icon:a=>(0,b.jsxs)("svg",{viewBox:"0 0 20 20",fill:"none",...a,children:[(0,b.jsx)("circle",{cx:"6",cy:"15",r:"2",stroke:"currentColor",strokeWidth:"1.4"}),(0,b.jsx)("circle",{cx:"14",cy:"13",r:"2",stroke:"currentColor",strokeWidth:"1.4"}),(0,b.jsx)("path",{d:"M8 15V5l8-1.5v9.5",stroke:"currentColor",strokeWidth:"1.4",strokeLinejoin:"round"})]})},{id:"agents",label:"Agents",icon:a=>(0,b.jsx)("svg",{viewBox:"0 0 20 20",fill:"none",...a,children:(0,b.jsx)("path",{d:"M11 2L4 12h5l-1 6 8-10h-5l1-6z",stroke:"currentColor",strokeWidth:"1.4",strokeLinejoin:"round"})})},{id:"data",label:"Data",icon:a=>(0,b.jsx)("svg",{viewBox:"0 0 20 20",fill:"none",...a,children:(0,b.jsx)("path",{d:"M4 16V11M9 16V6M14 16V9M17 16V4",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round"})})}],t={chat:{bg:"#DBEAFE",color:"#2563EB"},code:{bg:"#DCFCE7",color:"#16A34A"},image:{bg:"#EDE9FE",color:"#7C3AED"},video:{bg:"#FFE4E6",color:"#E11D48"},voice:{bg:"#FFEDD5",color:"#EA580C"},productivity:{bg:"#FEF9C3",color:"#CA8A04"},search:{bg:"#CFFAFE",color:"#0891B2"},design:{bg:"#FCE7F3",color:"#DB2777"},writing:{bg:"#E0E7FF",color:"#4F46E5"},music:{bg:"#FAE8FF",color:"#A21CAF"},agents:{bg:"#FEE2E2",color:"#DC2626"},data:{bg:"#E0F2FE",color:"#0369A1"}},u={chat:["Assistant","Multimodal"],code:["Dev Tools","Pair Programming"],image:["Generative","Creative Tools"],video:["Generative","Creator Tools"],voice:["Speech","Audio"],productivity:["Workflow","Calendar"],search:["Answer Engine","Research"],design:["UI/UX","No-Code"],writing:["Copywriting","Content"],music:["Audio","Generative"],agents:["Autonomous","Automation"],data:["Analytics","BI"]},v=["linear-gradient(135deg,#D1FAE5,#A7F3D0)","linear-gradient(135deg,#FFE8D6,#FFD1A9)","linear-gradient(135deg,#FDE68A,#FCA5A5)","linear-gradient(135deg,#DBEAFE,#E0E7FF)","linear-gradient(135deg,#FFE4E6,#FECACA)","linear-gradient(135deg,#EDE9FE,#DDD6FE)","linear-gradient(135deg,#FEF9C3,#D9F99D)","linear-gradient(135deg,#CFFAFE,#BAE6FD)"],w=[["ChatGPT","OpenAI","chat","A conversational assistant for writing, brainstorming, and answering questions on any topic.","https://chat.openai.com",4200,312,400,!1],["Claude","Anthropic","chat","An assistant built for long documents, careful reasoning, and natural conversation.","https://claude.ai",3800,287,380,!1],["Gemini","Google","chat","A multimodal model that reasons across text, code, images, and video.","https://gemini.google.com",3100,201,300,!1],["Pi","Inflection AI","chat","A personal AI designed to be supportive, curious, and easy to talk to.","https://pi.ai",540,64,250,!0],["Character.AI","Character Technologies","chat","Chat with millions of user-created AI characters and personas.","https://character.ai",1200,145,320,!1],["Mistral Le Chat","Mistral AI","chat","A fast, open-weight chat assistant from the Mistral research team.","https://chat.mistral.ai",410,38,120,!0],["GitHub Copilot","GitHub","code","An AI pair programmer that suggests code and entire functions in real time.","https://github.com/features/copilot",2900,264,360,!1],["Cursor","Anysphere","code","An AI-first code editor built around chat, edits, and codebase-wide context.","https://cursor.sh",1600,198,90,!1],["Replit AI","Replit","code","Generates, explains, and debugs code directly inside the Replit workspace.","https://replit.com/ai",720,91,200,!0],["Cody","Sourcegraph","code","A coding assistant that understands your whole codebase, not just the open file.","https://sourcegraph.com/cody",480,52,150,!0],["Tabnine","Tabnine","code","Privacy-focused code completion that can run fully on your own infrastructure.","https://tabnine.com",360,40,280,!0],["v0","Vercel","code","Generates production-ready React UI from a text prompt or screenshot.","https://v0.dev",980,132,8,!1],["Midjourney","Midjourney","image","Creates highly stylized, artistic images from short text prompts.","https://midjourney.com",3300,276,420,!1],["DALL·E 3","OpenAI","image","Generates detailed images from natural language descriptions.","https://openai.com/dall-e-3",2700,211,260,!1],["Stable Diffusion","Stability AI","image","An open-weight image model that powers countless creative tools.","https://stability.ai",2100,189,400,!0],["Ideogram","Ideogram AI","image","An image generator known for rendering legible text inside images.","https://ideogram.ai",690,84,6,!0],["Leonardo AI","Leonardo Interactive","image","Fine-tunable image generation for game art, concept art, and design.","https://leonardo.ai",540,61,180,!0],["Adobe Firefly","Adobe","image","Generative image and design tools built into the Adobe ecosystem.","https://firefly.adobe.com",610,58,220,!0],["Sora","OpenAI","video","Generates realistic video clips from text, with consistent motion and scenes.","https://openai.com/sora",2500,233,4,!1],["Runway Gen-3","Runway","video","A video generation and editing suite built for filmmakers and creators.","https://runwayml.com",1300,124,60,!1],["Pika","Pika Labs","video","Turns text or images into short, stylized video clips.","https://pika.art",760,79,45,!0],["Synthesia","Synthesia","video","Creates talking-head videos with AI avatars in dozens of languages.","https://synthesia.io",540,49,240,!1],["HeyGen","HeyGen","video","Generates avatar videos for marketing, training, and localization.","https://heygen.com",470,53,70,!1],["Luma Dream Machine","Luma AI","video","Generates short cinematic video clips from text or images.","https://lumalabs.ai/dream-machine",590,67,9,!0],["ElevenLabs","ElevenLabs","voice","Realistic AI voice generation and cloning for narration and dubbing.","https://elevenlabs.io",1900,162,280,!1],["Murf AI","Murf","voice","A studio for turning scripts into polished AI voiceovers.","https://murf.ai",410,36,200,!0],["Play.ht","PlayHT","voice","Text-to-speech voices for podcasts, apps, and audio content.","https://play.ht",320,29,260,!0],["WellSaid Labs","WellSaid Labs","voice","Enterprise-grade synthetic voices for branded audio content.","https://wellsaidlabs.com",210,18,300,!1],["Notion AI","Notion","productivity","Writes, summarizes, and organizes notes directly inside Notion.","https://notion.so/product/ai",1500,138,320,!1],["Motion","Motion","productivity","Automatically builds and re-plans your daily schedule around deadlines.","https://usemotion.com",380,44,140,!0],["Reclaim AI","Reclaim","productivity","Defends focus time on your calendar and schedules tasks automatically.","https://reclaim.ai",290,31,180,!0],["Superhuman","Superhuman","productivity","An AI-accelerated email client built for speed and inbox zero.","https://superhuman.com",640,71,360,!1],["Perplexity","Perplexity AI","search","An answer engine that searches the web and cites its sources.","https://perplexity.ai",2200,197,200,!1],["Phind","Phind","search","A search engine built specifically for developers and technical questions.","https://phind.com",380,42,220,!0],["You.com","You.com","search","A search assistant that blends web results with AI-generated answers.","https://you.com",310,27,260,!0],["Figma AI","Figma","design","AI tools built into Figma for layout, content, and design exploration.","https://figma.com",720,88,70,!1],["Framer AI","Framer","design","Generates an editable website from a short text description.","https://framer.com/ai",610,73,110,!0],["Canva Magic Studio","Canva","design","A suite of AI design tools built into the Canva editor.","https://canva.com/magic-studio",980,102,150,!1],["Galileo AI","Galileo","design","Turns a text prompt into an editable, high-fidelity UI design.","https://usegalileo.ai",340,39,10,!0],["Jasper","Jasper AI","writing","An AI writing platform built for marketing and brand content.","https://jasper.ai",560,47,300,!1],["Copy.ai","Copy.ai","writing","Generates marketing copy, emails, and content at scale.","https://copy.ai",480,41,280,!0],["Grammarly","Grammarly","writing","Checks tone, clarity, and grammar as you write anywhere online.","https://grammarly.com",1900,154,420,!1],["Writesonic","Writesonic","writing","Generates articles, ads, and product copy from a short brief.","https://writesonic.com",300,26,240,!0],["Suno","Suno AI","music","Generates full songs — vocals and instrumentals — from a text prompt.","https://suno.com",1400,176,12,!1],["Udio","Udio","music","Creates original music tracks in a wide range of styles and genres.","https://udio.com",980,119,7,!0],["Devin","Cognition AI","agents","An autonomous software engineer that plans, codes, and tests changes.","https://cognition.ai",1100,158,5,!1],["Lindy","Lindy AI","agents","Builds AI agents that handle email, scheduling, and repetitive workflows.","https://lindy.ai",420,56,9,!0],["Glean","Glean","data","An AI search layer that connects and indexes your company's apps.","https://glean.com",350,33,160,!0],["Julius AI","Julius","data","Analyzes spreadsheets and data with plain-English chat.","https://julius.ai",290,35,30,!0],["Akkio","Akkio","data","Builds and deploys predictive models without writing any code.","https://akkio.com",180,19,200,!1]].map((a,b)=>{let[c,d,e,f,g,h,i,j,l]=a;return{id:`prod-${b+1}`,name:c,maker:d,categoryId:e,tagline:f,url:g,upvotes:h,comments:i,launchedAt:k(j),isFree:l,gradient:v[b%v.length],monogram:c.replace(/[^A-Za-z0-9]/g,"").slice(0,2).toUpperCase(),topics:u[e]||[]}}),x={id:"promoted-1",name:"Orbital API",maker:"Orbital",categoryId:"data",tagline:"One key, every model. Route GPT, Claude, and Gemini traffic through a single low-latency gateway.",url:"#",gradient:"linear-gradient(135deg,#1F2430,#3A4356)",monogram:"OA",topics:["AI API","Developer Tools"]};function y({url:a,monogram:d,size:e=56}){let[f,h]=c.default.useState(!1),i="";try{i=new URL(a).hostname}catch{i=""}return f||!i?(0,b.jsx)("span",{style:{fontSize:.32*e,fontWeight:700,color:g},children:d}):(0,b.jsx)("img",{src:`https://www.google.com/s2/favicons?sz=128&domain=${i}`,alt:"",width:.62*e,height:.62*e,style:{objectFit:"contain",display:"block"},onError:()=>h(!0)})}function z({rank:a}){let c=a<=3;return(0,b.jsx)("div",{className:`flex items-center justify-center w-7 h-7 rounded-full text-[12px] font-bold tabular-nums flex-shrink-0 ${c?"rank-top3":""}`,style:c?{background:f,color:"#fff"}:{background:"#fff",color:"#4B5563",boxShadow:"0 1px 4px rgba(0,0,0,.1)"},children:a})}function A({product:a,rank:c,isUpvoted:d,onUpvote:e,isNew:k}){let l=t[a.categoryId],m=s.find(b=>b.id===a.categoryId),n=a.upvotes+ +!!d;return(0,b.jsxs)("div",{className:"product-card group relative flex flex-col rounded-[18px] overflow-hidden",style:{border:`1px solid ${j}`,background:"#fff"},children:[(0,b.jsxs)("div",{className:"relative h-[92px] overflow-hidden flex items-center justify-center",children:[(0,b.jsx)("div",{className:"card-header-bg absolute inset-0",style:{background:a.gradient}}),(0,b.jsx)("div",{className:"absolute inset-0",style:{background:"radial-gradient(circle at 50% 120%, rgba(255,255,255,.35), transparent 60%)"}}),(0,b.jsx)("div",{className:"absolute top-3 left-3 z-10",children:(0,b.jsx)(z,{rank:c})}),(0,b.jsxs)("div",{className:"absolute top-3 right-3 z-10 flex items-center gap-1.5",children:[k&&(0,b.jsx)("span",{className:"new-badge text-[9.5px] font-bold px-2 py-[3px] rounded-full",style:{background:"rgba(255,255,255,.92)",color:f},children:"NEW"}),a.isFree&&(0,b.jsx)("span",{className:"new-badge text-[9.5px] font-bold px-2 py-[3px] rounded-full",style:{background:"rgba(255,255,255,.92)",color:"#16A34A"},children:"FREE"})]}),(0,b.jsx)("div",{className:"monogram-tile relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden",style:{background:"rgba(255,255,255,.95)",boxShadow:"0 6px 18px rgba(0,0,0,0.12)",border:"1px solid rgba(255,255,255,.8)",backdropFilter:"blur(4px)"},children:(0,b.jsx)(y,{url:a.url,monogram:a.monogram,size:64})})]}),(0,b.jsxs)("div",{className:"flex-1 flex flex-col px-4 pt-3.5 pb-4",children:[(0,b.jsx)("div",{className:"flex items-center gap-2",children:(0,b.jsx)("a",{href:a.url,target:"_blank",rel:"noreferrer",className:"text-[15.5px] font-bold hover:underline truncate",style:{color:g},children:a.name})}),(0,b.jsx)("span",{className:"text-[12.5px] mt-0.5",style:{color:h},children:a.maker}),(0,b.jsx)("p",{className:"text-[13px] mt-2 leading-relaxed flex-1 line-clamp-3",style:{color:"#4B5563"},children:a.tagline}),(0,b.jsxs)("div",{className:"flex items-center gap-1.5 mt-3 flex-wrap",children:[(0,b.jsx)("span",{className:"text-[11px] font-semibold px-2.5 py-1 rounded-full",style:{background:l.bg,color:l.color},children:m?.label}),a.topics.map(a=>(0,b.jsx)("span",{className:"topic-chip text-[11px] font-medium px-2.5 py-1 rounded-full",style:{background:i,color:"#6B7280"},children:a},a))]}),(0,b.jsxs)("div",{className:"flex items-center justify-between mt-3.5 pt-3",style:{borderTop:`1px solid ${j}`},children:[(0,b.jsxs)("button",{onClick:()=>e(a.id),className:"upvote-btn flex items-center gap-1.5 text-[12.5px] font-semibold px-2.5 py-1 rounded-lg",style:{color:d?f:h,background:d?"#FFF0F1":"transparent"},children:[(0,b.jsx)(p,{filled:d,className:"w-3.5 h-3.5"}),n>=1e3?`${(n/1e3).toFixed(1)}k`:n]}),(0,b.jsxs)("span",{className:"flex items-center gap-1.5 text-[12.5px] font-semibold",style:{color:h},children:[(0,b.jsx)(q,{className:"w-3.5 h-3.5"}),a.comments]})]})]})]})}function B({product:a}){return(0,b.jsxs)("div",{className:"promoted-card relative flex flex-col sm:flex-row sm:items-center gap-4 rounded-[20px] overflow-hidden p-5 sm:p-6",style:{background:"linear-gradient(120deg,#1A1E29 0%,#2A2F40 55%,#3A2030 100%)",boxShadow:"0 10px 30px rgba(31,36,48,.25)"},children:[(0,b.jsx)("div",{className:"absolute inset-0 pointer-events-none",style:{background:"radial-gradient(circle at 85% 30%, rgba(255,90,95,.18), transparent 55%)"}}),(0,b.jsx)("div",{className:"relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden",style:{background:"rgba(255,255,255,.95)",boxShadow:"0 6px 18px rgba(0,0,0,0.25)"},children:(0,b.jsx)("span",{className:"text-[20px] font-black",style:{color:"#1F2430"},children:a.monogram})}),(0,b.jsxs)("div",{className:"relative z-10 flex-1 min-w-0",children:[(0,b.jsxs)("div",{className:"flex items-center gap-2 flex-wrap mb-1.5",children:[(0,b.jsxs)("span",{className:"text-[9.5px] font-bold uppercase tracking-wider px-2 py-[3px] rounded-full flex items-center gap-1",style:{background:"rgba(255,255,255,.12)",color:"#fff",border:"1px solid rgba(255,255,255,.18)"},children:[(0,b.jsx)(n,{className:"w-2.5 h-2.5"})," Promoted"]}),(0,b.jsx)("span",{className:"text-[12.5px]",style:{color:"rgba(255,255,255,.55)"},children:a.maker})]}),(0,b.jsx)("a",{href:a.url,className:"text-[18px] sm:text-[20px] font-bold hover:underline block",style:{color:"#fff"},children:a.name}),(0,b.jsx)("p",{className:"text-[13px] mt-1.5 leading-relaxed max-w-[520px]",style:{color:"rgba(255,255,255,.7)"},children:a.tagline}),(0,b.jsx)("div",{className:"flex items-center gap-1.5 mt-3 flex-wrap",children:a.topics.map(a=>(0,b.jsx)("span",{className:"text-[11px] font-medium px-2.5 py-1 rounded-full",style:{background:"rgba(255,255,255,.08)",color:"rgba(255,255,255,.8)",border:"1px solid rgba(255,255,255,.12)"},children:a},a))})]}),(0,b.jsxs)("a",{href:a.url,className:"btn-press relative z-10 flex items-center justify-center gap-1.5 text-[13px] font-semibold px-5 py-2.5 rounded-full flex-shrink-0 self-start sm:self-center",style:{background:"#fff",color:"#1F2430"},children:["Try it free ",(0,b.jsx)(o,{className:"w-3.5 h-3.5"})]})]})}function C({product:a,isUpvoted:c,onUpvote:d}){let e=t[a.categoryId];return(0,b.jsxs)("div",{className:"feed-row flex items-center gap-3 py-3 group",children:[(0,b.jsx)("div",{className:"w-9 h-9 rounded-xl flex items-center justify-center font-bold text-[12px] flex-shrink-0 overflow-hidden",style:{background:"#fff",border:"1px solid #F0F0F0"},children:(0,b.jsx)(y,{url:a.url,monogram:a.monogram,size:36})}),(0,b.jsxs)("div",{className:"flex-1 min-w-0",children:[(0,b.jsxs)("div",{className:"flex items-center gap-2 flex-wrap",children:[(0,b.jsx)("a",{href:a.url,className:"text-[14px] font-bold hover:underline truncate",style:{color:g},children:a.name}),a.isFree&&(0,b.jsx)("span",{className:"text-[10px] font-bold px-1.5 py-[2px] rounded-full",style:{background:"#DCFCE7",color:"#16A34A"},children:"Free"}),(0,b.jsx)("span",{className:"text-[10.5px] font-semibold px-2 py-[2px] rounded-full flex-shrink-0",style:{background:e.bg,color:e.color},children:s.find(b=>b.id===a.categoryId)?.label})]}),(0,b.jsx)("p",{className:"text-[12.5px] mt-0.5 truncate",style:{color:"#6B7280"},children:a.tagline})]}),(0,b.jsxs)("button",{onClick:()=>d(a.id),className:"flex items-center gap-1 text-[12px] font-semibold flex-shrink-0 transition-transform active:scale-90",style:{color:c?f:h},children:[(0,b.jsx)(p,{filled:c,className:"w-3.5 h-3.5"}),a.upvotes+ +!!c>=1e3?`${((a.upvotes+ +!!c)/1e3).toFixed(1)}k`:a.upvotes+ +!!c]})]})}a.s(["default",0,function(){let[a,p]=(0,c.useState)("all"),[q,t]=(0,c.useState)(""),[u,v]=(0,c.useState)("popular"),[y,z]=(0,c.useState)(!1),[D,E]=(0,c.useState)("grid"),[F,G]=(0,c.useState)(new Set),[H,I]=(0,c.useState)(20),J=(0,c.useMemo)(()=>k(0),[]),K=a=>Math.round((new Date(J)-new Date(a))/864e5),L=a=>G(b=>{let c=new Set(b);return c.has(a)?c.delete(a):c.add(a),c}),M=(0,c.useMemo)(()=>{let a={all:w.length};for(let b of w)a[b.categoryId]=(a[b.categoryId]||0)+1;return a},[]),N=(0,c.useMemo)(()=>{let b=[...w];if("all"!==a&&(b=b.filter(b=>b.categoryId===a)),y&&(b=b.filter(a=>a.isFree)),q.trim()){let a=q.trim().toLowerCase();b=b.filter(b=>b.name.toLowerCase().includes(a)||b.maker.toLowerCase().includes(a)||b.tagline.toLowerCase().includes(a))}return"popular"===u?b.sort((a,b)=>b.upvotes+ +!!F.has(b.id)-(a.upvotes+ +!!F.has(a.id))):b.sort((a,b)=>new Date(b.launchedAt)-new Date(a.launchedAt)),b},[a,q,u,y,F]),O=N.slice(0,H),P=(0,c.useMemo)(()=>{let a=[...N].sort((a,b)=>new Date(b.launchedAt)-new Date(a.launchedAt)),b=[],c=null;for(let e of a){var d;let a=(d=K(e.launchedAt))<=0?"Today":1===d?"Yesterday":d<=7?"Earlier This Week":d<=30?"Earlier This Month":"Older";a!==c&&(b.push({label:a,items:[]}),c=a),b[b.length-1].items.push(e)}return b},[N,J]);return(0,b.jsxs)("div",{className:"min-h-screen bg-white",style:{fontFamily:"Inter, ui-sans-serif, system-ui, sans-serif"},children:[(0,b.jsx)("style",{children:`
        .no-scrollbar::-webkit-scrollbar{display:none}
        .no-scrollbar{scrollbar-width:none}

        /* Product card hover lift */
        .product-card {
          transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
        }
        .product-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(0,0,0,.08), 0 2px 8px rgba(0,0,0,.04) !important;
          border-color: #D0D5DD !important;
        }

        /* Upvote button pulse */
        .upvote-btn {
          transition: transform .15s ease, color .15s ease;
        }
        .upvote-btn:active {
          transform: scale(.88);
        }

        /* Feed row hover */
        .feed-row {
          transition: background .15s ease;
          border-radius: 10px;
          margin: 0 -8px;
          padding-left: 8px;
          padding-right: 8px;
        }
        .feed-row:hover {
          background: #F8F9FB;
        }

        /* Category pill hover */
        .cat-pill {
          transition: all .15s ease;
        }
        .cat-pill:hover {
          transform: scale(1.03);
          box-shadow: 0 2px 8px rgba(0,0,0,.06);
        }

        /* Search bar focus */
        .search-bar {
          transition: box-shadow .2s ease, border-color .2s ease;
          border: 1.5px solid transparent;
        }
        .search-bar:focus-within {
          box-shadow: 0 0 0 3px rgba(255,90,95,.1);
          border-color: #FF5A5F !important;
          background: #fff !important;
        }

        /* Promoted card shimmer */
        .promoted-card {
          position: relative;
          overflow: hidden;
        }
        .promoted-card::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.08), transparent);
          animation: shimmer 3s infinite;
        }
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 200%; }
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)) !important;
          }
        }
        @media (max-width: 768px) {
          .products-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 12px !important;
          }
          .products-hero h1 {
            font-size: 28px !important;
          }
          .products-controls {
            flex-direction: column;
            align-items: stretch !important;
          }
          .products-controls .search-bar {
            max-width: 100% !important;
          }
        }
        @media (max-width: 480px) {
          .products-grid {
            grid-template-columns: 1fr !important;
          }
        }

        /* CTA banner hover */
        .cta-banner {
          transition: box-shadow .2s ease, transform .2s ease;
        }
        .cta-banner:hover {
          box-shadow: 0 8px 24px rgba(255,90,95,.1);
          transform: translateY(-1px);
        }

        /* ── Entrance animations ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .products-hero { animation: fadeUp .5s cubic-bezier(.22,1,.36,1) both; }
        .products-controls { animation: fadeUp .5s cubic-bezier(.22,1,.36,1) .08s both; }

        /* Staggered card entrance */
        .product-card {
          animation: fadeUp .45s cubic-bezier(.22,1,.36,1) both;
        }
        .products-grid > *:nth-child(1)  .product-card,
        .products-grid > .product-card:nth-child(1)  { animation-delay: .02s; }
        .products-grid > .product-card:nth-child(2)  { animation-delay: .06s; }
        .products-grid > .product-card:nth-child(3)  { animation-delay: .10s; }
        .products-grid > .product-card:nth-child(4)  { animation-delay: .14s; }
        .products-grid > .product-card:nth-child(5)  { animation-delay: .18s; }
        .products-grid > .product-card:nth-child(6)  { animation-delay: .22s; }
        .products-grid > .product-card:nth-child(7)  { animation-delay: .26s; }
        .products-grid > .product-card:nth-child(8)  { animation-delay: .30s; }

        /* Gradient hero title */
        .hero-title {
          background: linear-gradient(120deg, #1F2430 0%, #FF5A5F 55%, #E0454B 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* HOT badge gentle pulse */
        .hot-badge {
          animation: hotPulse 2.4s ease-in-out infinite;
        }
        @keyframes hotPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,90,95,.0); }
          50%      { box-shadow: 0 0 0 4px rgba(255,90,95,.12); }
        }

        /* Rank badge for top 3 — subtle glow */
        .rank-top3 {
          box-shadow: 0 2px 8px rgba(255,90,95,.35);
        }

        /* NEW badge */
        .new-badge {
          backdrop-filter: blur(4px);
          box-shadow: 0 2px 6px rgba(0,0,0,.08);
        }

        /* Buttons — generic press + lift */
        .btn-press { transition: transform .15s ease, box-shadow .2s ease, background .2s ease, color .2s ease; }
        .btn-press:hover { transform: translateY(-1px); }
        .btn-press:active { transform: translateY(0) scale(.97); }

        /* Outline accent button hover fill */
        .btn-outline-red { transition: all .2s ease; }
        .btn-outline-red:hover { background: #FF5A5F !important; color: #fff !important; box-shadow: 0 6px 16px rgba(255,90,95,.25); }

        /* Card image header subtle zoom */
        .card-header-bg { transition: transform .5s ease; }
        .product-card:hover .card-header-bg { transform: scale(1.1); }

        /* Logo tile pop on hover */
        .monogram-tile { transition: transform .3s cubic-bezier(.34,1.56,.64,1); }
        .product-card:hover .monogram-tile { transform: scale(1.08) translateY(-2px); }

        /* Line clamp helper */
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Promoted CTA hover */
        .promoted-card .btn-press:hover { box-shadow: 0 6px 18px rgba(255,255,255,.2); }

        /* Topic chip hover */
        .topic-chip { transition: all .15s ease; }
        .topic-chip:hover { background: #F0F0F0 !important; }
      `}),(0,b.jsx)(d.default,{}),(0,b.jsx)(e.default,{}),(0,b.jsxs)("div",{className:"lg:pl-[250px] pt-[52px]",children:[(0,b.jsx)("div",{className:"flex items-center gap-2 px-5 sm:px-8 py-3 border-b border-[#F0F0F0] overflow-x-auto no-scrollbar",children:s.map(c=>{let d=a===c.id;return(0,b.jsxs)("button",{onClick:()=>p(c.id),className:"cat-pill flex items-center gap-1.5 px-3.5 py-[7px] rounded-full text-[12.5px] font-medium flex-shrink-0",style:d?{background:"#FEF0F0",color:"#FF5A5F",border:"1px solid #FECACA"}:{color:"#484848",border:"1px solid #EBEBEB",background:"#fff"},children:[(0,b.jsx)(c.icon,{className:"w-3.5 h-3.5 flex-shrink-0"}),c.label,(0,b.jsx)("span",{className:"text-[10.5px] font-semibold tabular-nums",style:{color:d?"#FF5A5F":"#9CA3AF"},children:M[c.id]??0})]},c.id)})}),(0,b.jsxs)("main",{className:"flex-1 px-5 sm:px-8 py-8",children:[(0,b.jsxs)("div",{className:"products-hero flex items-start justify-between gap-4 flex-wrap mb-6",children:[(0,b.jsxs)("div",{children:[(0,b.jsxs)("span",{className:"hot-badge inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full mb-3",style:{background:"#FFF0F1",color:f},children:[(0,b.jsx)(l,{className:"w-3 h-3"})," HOT"]}),(0,b.jsx)("h1",{className:"hero-title text-[34px] sm:text-[42px] font-bold leading-tight",style:{color:g},children:"Hottest AI Products"}),(0,b.jsxs)("p",{className:"text-[15px] mt-2 max-w-[480px]",style:{color:h},children:["Explore ",w.length,"+ of the most popular and game-changing AI products across every category."]})]}),(0,b.jsxs)("a",{href:"#",className:"btn-outline-red btn-press flex items-center gap-1.5 text-[13.5px] font-semibold px-4 py-2.5 rounded-full flex-shrink-0",style:{border:`1.5px solid ${f}`,color:f,background:"#fff"},children:["View all products ",(0,b.jsx)(o,{className:"w-3.5 h-3.5"})]})]}),(0,b.jsxs)("div",{className:"products-controls flex items-center gap-3 mb-3 flex-wrap",children:[(0,b.jsxs)("div",{className:"search-bar flex items-center gap-2 rounded-full px-4 py-2.5 flex-1 min-w-[220px] max-w-[420px]",style:{background:i},children:[(0,b.jsx)(m,{className:"w-4 h-4 flex-shrink-0",style:{color:h}}),(0,b.jsx)("input",{value:q,onChange:a=>t(a.target.value),placeholder:"Search 50+ AI tools…",className:"bg-transparent outline-none text-[13.5px] flex-1",style:{color:g}})]}),(0,b.jsx)("button",{onClick:()=>z(a=>!a),className:"btn-press flex items-center gap-1.5 text-[12.5px] font-semibold px-3.5 py-2 rounded-full flex-shrink-0",style:y?{background:"#16A34A",color:"#fff",boxShadow:"0 4px 12px rgba(22,163,74,.25)"}:{border:`1.5px solid ${j}`,color:"#4B5563",background:"#fff"},children:"Free only"}),(0,b.jsx)("div",{className:"flex items-center rounded-full p-1 flex-shrink-0",style:{background:i},children:[["popular","Most Popular"],["newest","Newest"]].map(([a,c])=>(0,b.jsx)("button",{onClick:()=>v(a),className:"text-[12.5px] font-semibold px-3.5 py-1.5 rounded-full transition-colors",style:u===a?{background:"#fff",color:g,boxShadow:"0 1px 2px rgba(0,0,0,0.06)"}:{color:h},children:c},a))}),(0,b.jsx)("div",{className:"flex items-center rounded-full p-1 flex-shrink-0",style:{background:i},children:[["grid","Grid"],["feed","Feed"]].map(([a,c])=>(0,b.jsx)("button",{onClick:()=>E(a),className:"text-[12.5px] font-semibold px-3.5 py-1.5 rounded-full transition-colors",style:D===a?{background:"#fff",color:g,boxShadow:"0 1px 2px rgba(0,0,0,0.06)"}:{color:h},children:c},a))})]}),(0,b.jsxs)("p",{className:"text-[12.5px] mb-5",style:{color:h},children:["Showing ",(0,b.jsx)("span",{className:"font-semibold",style:{color:g},children:Math.min(H,N.length)})," of"," ",(0,b.jsx)("span",{className:"font-semibold",style:{color:g},children:N.length})," tools","all"!==a&&(0,b.jsxs)(b.Fragment,{children:[" in ",(0,b.jsx)("span",{className:"font-semibold",style:{color:g},children:s.find(b=>b.id===a)?.label})]})]}),0===N.length?(0,b.jsxs)("div",{className:"py-16 text-center",children:[(0,b.jsx)("p",{className:"text-[14px] font-semibold",style:{color:g},children:"No products match that search"}),(0,b.jsx)("p",{className:"text-[13px] mt-1",style:{color:h},children:"Try a different category or keyword."})]}):"grid"===D?(0,b.jsxs)(b.Fragment,{children:[!q.trim()&&(0,b.jsx)("div",{className:"mb-5",children:(0,b.jsx)(B,{product:x})}),(0,b.jsx)("div",{className:"products-grid grid gap-5",style:{gridTemplateColumns:"repeat(auto-fill, minmax(230px, 1fr))"},children:O.map((a,c)=>(0,b.jsx)(A,{product:a,rank:c+1,isUpvoted:F.has(a.id),onUpvote:L,isNew:14>=K(a.launchedAt)},a.id))}),H<N.length&&(0,b.jsx)("div",{className:"flex justify-center mt-7",children:(0,b.jsxs)("button",{onClick:()=>I(a=>a+20),className:"btn-press text-[13.5px] font-semibold px-5 py-2.5 rounded-full",style:{border:`1px solid ${j}`,color:g,background:"#fff"},children:["Show more (",N.length-H," more)"]})})]}):(0,b.jsx)("div",{className:"relative max-w-2xl",children:P.map((a,c)=>(0,b.jsxs)("div",{className:"relative pl-7 mb-2",children:[(0,b.jsx)("div",{className:"absolute left-[7px] top-1.5 bottom-0 w-px",style:{background:j,display:c===P.length-1?"none":"block"}}),(0,b.jsx)("div",{className:"absolute left-0 top-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center",style:{background:0===c?f:j},children:0===c&&(0,b.jsx)("span",{className:"w-1.5 h-1.5 rounded-full bg-white"})}),(0,b.jsxs)("div",{className:"flex items-center gap-2 mb-1",children:[(0,b.jsx)(r,{className:"w-3.5 h-3.5",style:{color:h}}),(0,b.jsx)("span",{className:"text-[12.5px] font-bold uppercase tracking-wide",style:{color:0===c?f:h},children:a.label})]}),(0,b.jsx)("div",{className:"divide-y",style:{borderColor:j},children:a.items.map(a=>(0,b.jsx)(C,{product:a,isUpvoted:F.has(a.id),onUpvote:L},a.id))})]},a.label+c))}),(0,b.jsxs)("div",{className:"cta-banner flex items-center justify-between gap-4 flex-wrap rounded-2xl px-6 py-5 mt-9",style:{background:"linear-gradient(90deg,#FFF5F5,#FFFBFB)",border:"1px solid #FFE1E2"},children:[(0,b.jsxs)("div",{className:"flex items-center gap-4",children:[(0,b.jsx)("div",{className:"w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0",style:{background:f,color:"#fff"},children:(0,b.jsx)(n,{className:"w-5 h-5"})}),(0,b.jsxs)("div",{children:[(0,b.jsx)("p",{className:"text-[14.5px] font-bold",style:{color:g},children:"Stay ahead of the curve"}),(0,b.jsx)("p",{className:"text-[13px]",style:{color:h},children:"Discover new AI products daily and never miss what's next."})]})]}),(0,b.jsxs)("a",{href:"#",className:"btn-press flex items-center gap-1.5 text-[13.5px] font-semibold px-4 py-2.5 rounded-full flex-shrink-0",style:{background:"#fff",color:f,border:`1px solid ${f}`},children:["Explore new products ",(0,b.jsx)(o,{className:"w-3.5 h-3.5"})]})]})]})]})]})}])}];

//# sourceMappingURL=fix-repo_src_app_products_page_tsx_0hbbnqe._.js.map