const backend='https://everyday-friction-survey.usmanmuhammad6565772.chatgpt.site';
export default async function handler(req,res){
res.setHeader('Cache-Control','no-store');
const endpoint=req.query.endpoint;
if(!['session','responses'].includes(endpoint))return res.status(404).json({error:'Not found.'});
const method=endpoint==='session'?'GET':'POST';
if(req.method!==method){res.setHeader('Allow',method);return res.status(405).json({error:'Method not allowed.'});}
if(method==='POST'&&req.headers.origin!==`https://${req.headers.host}`)return res.status(403).json({error:'Please submit from the survey page.'});
const cookie=(req.headers.cookie||'').split(';').map(v=>v.trim()).find(v=>/^survey_session=[a-zA-Z0-9.-]+$/.test(v))||'';
const body=method==='POST'?JSON.stringify(req.body):undefined;
if(body&&body.length>20000)return res.status(413).json({error:'Response too large.'});
try{
const upstream=await fetch(`${backend}/api/${endpoint}`,{method,headers:{'Content-Type':'application/json',Origin:backend,...(cookie?{Cookie:cookie}:{})},body,signal:AbortSignal.timeout(15000),redirect:'error'});
const type=upstream.headers.get('content-type')||'';
if(!type.includes('application/json'))throw Error('Backend unavailable');
const session=(upstream.headers.getSetCookie?.()||[upstream.headers.get('set-cookie')||'']).find(v=>v.startsWith('survey_session='));
if(session)res.setHeader('Set-Cookie',session);
res.status(upstream.status).json(await upstream.json());
}catch{return res.status(502).json({error:'Could not connect. Your answers are still here; please try again.'});}
}
