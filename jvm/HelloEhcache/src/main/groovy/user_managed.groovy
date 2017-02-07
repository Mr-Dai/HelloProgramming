import org.ehcache.config.builders.UserManagedCacheBuilder

def userManagedCache = UserManagedCacheBuilder.newUserManagedCacheBuilder(Long.class, String.class).build()
userManagedCache.init()

userManagedCache.put(1L, "Oh, my love")
println userManagedCache.get(1L)
userManagedCache.close()