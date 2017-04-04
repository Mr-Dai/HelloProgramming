public class StackSOF {
    private int stackLength = 1;

    public void stackLeak() {
        stackLength++;
        stackLeak();
    }

    public static void main(String[] args) throws Throwable {
        StackSOF sof = new StackSOF();
        try {
            sof.stackLeak();
        } catch (Throwable e) {
            System.out.println("Stack length: " + sof.stackLength);
        }
    }
}
