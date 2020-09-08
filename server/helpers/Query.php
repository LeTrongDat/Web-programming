<?php


class Query {
    private static $xArray;
    private static $rArray;

    private $x;
    private $y;
    private $r;
    private $creationTime;
    private $result;

    public static function init() {
        for($i = -5; $i <= 3; $i ++) self::$xArray[] = $i;
        for($i = 1; $i <= 5; $i ++) self::$rArray[] = $i;
    }
    public function __construct($x, $y, $r)
    {
        $this->x = $this->stringToNum($x);
        $this->y = $this->stringToNum($y);
        $this->r = $this->stringToNum($r);
        $this->validate();
        $this->creationTime = date("H:i:s d/m/Y");
        $this->result = $this->getResult();
    }
    public final function toHTMLTableRow() : string {
        return <<<ROW
    <tr class="row">
        <td>{$this->x}</td>
        <td>{$this->y}</td>
        <td>{$this->r}</td>
        <td>{$this->result}</td>
        <td>{$this->creationTime}</td>
    </tr>
ROW;
    }

    // ---------------------- Getter -----------------------------
    public function getX() {
        return $this->x;
    }
    public function getY() {
        return $this->y;
    }
    public function getR() {
        return $this->r;
    }
    public function getResult() {
        if ($this->result == null) {
            $this->result = $this->isInsideArea() ? "Yes" : "No";
        }
        return $this->result;
    }

    // ---------------------- Private Methods -------------------------------
    private function isInsideArea() {
        return (self::isInsideCircle($this->x, $this->y, $this->r)
            || self::isInsideRectangle($this->x, $this->y, $this->r)
            || self::isInsideTriangle($this->x, $this->y, $this->r));
    }
    private static function isInsideCircle(int $x, int $y, int $r) {
        return ($x >= 0 && $y >= 0 && $x * $x + $y * $y <= $r * $r);
    }
    private static function isInsideRectangle(int $x, int $y, int $r) {
        return (-$r <= 2 * $y && $y <= 0 && 0 <= $x && $x <= $r);
    }
    private static function isInsideTriangle(int $x, int $y, int $r) {
        if ($y > 0 || $y < -$r) return false;

        $lim_2x = $r - abs($y);

        return (-$lim_2x <= $x * 2 && $x <= 0);
    }
    private function stringToNUm($str) {
        if ($str == null || $str == "") {
            throw new Exception("Can not convert empty parameter(s) to number");
        }
        if (!is_numeric($str)) {
            throw new Exception("Can not convert $str to number");
        }
        return doubleval($str);
    }
    private function validate() {
        if ((int)$this->x != $this->x || !in_array((int)$this->x, self::$xArray, true)) {
            throw new Exception("Value of point X is invalid");
        }
        if ($this->y <= -3 || $this->y >= 5) {
            throw new Exception("Value of point Y is out of range");
        }
        if ((int)$this->r != $this->r || !in_array((int)$this->r, self::$rArray, true)) {
            throw new Exception("Value of radius is invalid");
        }
    }
}
Query::init();