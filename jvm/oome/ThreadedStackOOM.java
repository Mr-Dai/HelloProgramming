public class ThreadedStackOOM {

    private void dontStop() {
        while (true) {}
    }

    public void threadedStackLeak() {
        while (true) {
            Thread thread = new Thread(new Runnable() {
                @Override
                public void run() {
                    dontStop();
                }
            });
            thread.start();
        }
    }

    public static void main(String[] args) {
        ThreadedStackOOM oom = new ThreadedStackOOM();
        oom.threadedStackLeak();
    }
}