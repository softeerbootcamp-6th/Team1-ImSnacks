package com.ImSnacks.NyeoreumnagiBatch.reader.util;

public class Pair<T1, T2> {
    private final T1 first;
    private final T2 second;

    public Pair(T1 t1, T2 t2) {
        first = t1;
        second = t2;
    }

    public T1 first() {
        return this.first;
    }

    public T2 second() {
        return this.second;
    }
}
