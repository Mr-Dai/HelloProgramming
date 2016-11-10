package spittr.data;

import spittr.Spittle;

import java.util.List;

public interface SpittleRepository {

    Spittle findOne(long spittleId);

    List<Spittle> findSpittles(long max, int count);

}
