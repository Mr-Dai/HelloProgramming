import org.ehcache.config.builders.CacheConfigurationBuilder
import org.ehcache.config.builders.CacheManagerBuilder
import org.ehcache.config.builders.ResourcePoolsBuilder
import org.ehcache.config.units.EntryUnit
import org.ehcache.config.units.MemoryUnit

def cacheManager = CacheManagerBuilder.newCacheManagerBuilder()
        .with(CacheManagerBuilder.persistence("myData"))
        .withCache("tieredCache",
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Long.class, String.class,
                ResourcePoolsBuilder.newResourcePoolsBuilder()
                    .heap(10, EntryUnit.ENTRIES)
                    .offheap(10, MemoryUnit.MB)
                    .disk(20, MemoryUnit.MB, true)
            )
        ).build(true)

def tieredCache = cacheManager.getCache("tieredCache", Long.class, String.class)
tieredCache.put(1L, "Oh my love")
println tieredCache.get(1L)
cacheManager.close()