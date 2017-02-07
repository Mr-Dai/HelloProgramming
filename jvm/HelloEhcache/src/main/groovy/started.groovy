import org.ehcache.config.builders.CacheConfigurationBuilder
import org.ehcache.config.builders.CacheManagerBuilder
import org.ehcache.config.builders.ResourcePoolsBuilder

// Build a CacheManager with a pre-configured Cache
def cacheManager = CacheManagerBuilder.newCacheManagerBuilder()
        .withCache("preConfigured",
        CacheConfigurationBuilder.newCacheConfigurationBuilder(Long.class, String.class, ResourcePoolsBuilder.heap(10)))
        .build()
// Initialize the CacheManager.
cacheManager.init()

// Fetch the pre-configured Cache from the CacheManager
def preConfigured = cacheManager.getCache("preConfigured", Long.class, String.class)

// Create a new Cache for the initialized CacheManager
def myCache = cacheManager.createCache("myCache",
        CacheConfigurationBuilder.newCacheConfigurationBuilder(Long.class, String.class,
                ResourcePoolsBuilder.heap(10)).build())

// Cache and fetch data with the created Cache
myCache.put(1L, "Oh my love")
println myCache.get(1L)

// Remove the pre-configured Cache from the CacheManager.
// All transient resource allocated to the Cache will be released,
// all references to the cache will be invalidated.
cacheManager.removeCache("preConfigured")
// Close the CacheManager to release all allocated resource
cacheManager.close()