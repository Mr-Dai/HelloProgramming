R=java

%.class: %.java
	javac $<

HeapOOM: HeapOOM.class
	$(R) -Xms20m -Xmx20m -XX:+HeapDumpOnOutOfMemoryError $@

StackSOF: StackSOF.class
	$(R) -Xss228k $@

ThreadedStackOOM: ThreadedStackOOM.class
	$(R) -Xss2M $@

DirectMemoryOOM: DirectMemoryOOM.class
	$(R) -Xmx20m -XX:MaxDirectMemorySize=10m $@

FinalizeEscapeGC: FinalizeEscapeGC.class
	$(R) $@

.PHONY: clean
clean:
	rm -f *.class *.index *.threads *.zip *.hprof
