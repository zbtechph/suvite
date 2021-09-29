import store from '../store'

export default (to, from, next) => {
    if(to.hash){
        const hashStr = to.hash.substr(1,to.hash.length);
        const hashParams = new URLSearchParams(hashStr);
        if( hashParams.get("type") === "recovery" ) {
            return next({ name: 'recoverPwd', query: { 'access_token': hashParams.get("access_token") } })
        }
    }
    const excempt = [ 'login', 'register', 'recover' ]
    if( excempt.find(name => name === to.name) && store.state.session.user ) return next({ name: 'home' })
    if ( to.name !== 'login' 
        && ! store.state.session.user
        && to.meta.requiresAuth ) return next({ name: 'login', query: { redirect: to.fullPath } })
    else return next()
}
  