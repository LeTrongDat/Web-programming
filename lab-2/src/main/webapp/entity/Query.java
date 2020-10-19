package main.webapp.entity;

import com.sun.istack.internal.NotNull;
import main.webapp.exception.WLException;
import main.webapp.exception.WebLabException;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

public class Query implements Serializable {
    private static final long serialVersionUID = 8442671044445353433L;

    @NotNull
    private Double x;

    @NotNull
    private Double y;

    @NotNull
    private Double r;

    private String result;

    private Long executionTime;

    private String creationTime;

    public Query(@NotNull String x, @NotNull String y, @NotNull String r) {
        this.x = Double.parseDouble(x);

        this.y = Double.parseDouble(y);

        this.r = Double.parseDouble(r);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm dd:mm:yyyy");
        creationTime = LocalDateTime.now(ZoneId.of("UTC+3")).format(formatter);

        validate();
    }

    public String getX() {
        return String.format("%.2f", this.x);
    }

    public String getY() {
        return String.format("%.2f", this.y);
    }

    public String getR() {
        return String.format("%.2f", this.r);
    }

    public String getResult() {
        if (this.result == null) {
            this.executionTime = System.currentTimeMillis();
            this.result = isInsideArea() ? "Yes" : "No";
            this.executionTime = System.currentTimeMillis() - this.executionTime;
        }
        return this.result;
    }

    public Long getExecutionTime() {
        return executionTime;
    }

    public String getCreationTime() {
        return creationTime;
    }

    // ------- Private methods -------

    private void validate() {
//        TreeSet<Double> xValues = new TreeSet<>();
//        for(int i = -3; i <= 5; i++) xValues.add((double) i);
//        if (!xValues.contains(this.x)) throw new WebLabException(WLException.INVALID_POINT_X_MESSAGE);

        if (this.y <= -3 || this.y >= 3) throw new WebLabException(WLException.INVALID_POINT_Y_MESSAGE);

//        List<Double> rValues = Arrays.asList(1.0, 1.5, 2.0, 2.5, 3.0);
//        if (!rValues.contains(this.r)) throw new WebLabException(WLException.INVALID_RADIUS_MESSAGE);
    }

    private boolean isInsideArea() {
        return (isInsideCircle() || isInsideRectangle() || isInsideTriangle());
    }

    private boolean isInsideCircle() {
        return (this.x >= 0 && this.y <= 0 && Math.pow(this.x, 2) + Math.pow(this.y, 2) <= Math.pow(this.r, 2));
    }
    private boolean isInsideRectangle() {
        return (-this.r <= this.x && this.x <= 0 && this.r >= 2 * this.y && this.y >= 0);
    }
    private boolean isInsideTriangle() {
        return (this.y >= 0 && this.x >= 0 && 2 * this.x <= this.r - 2 * this.y);
    }
}
