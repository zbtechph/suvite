import store from '../store'

export default (to, from, next) => {
    const excempt = [ 'login', 'register', 'recover' ]
    if( excempt.find(name => name === to.name) && store.state.session.user ) return next({ name: 'home' })
    if ( to.name !== 'login' 
        && ! store.state.session.user
        && to.meta.requiresAuth ) return next({ name: 'login', query: { redirect: to.fullPath } })
    else return next()
}
  