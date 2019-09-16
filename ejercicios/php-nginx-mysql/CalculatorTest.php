<?php

namespace App\Tests;

use App\Calculator;
use PHPUnit\Framework\TestCase;

class CalculatorTest extends TestCase
{
    public function testAdd()
    {
        $calculator = new Calculator();
        $result = $calculator->add(30, 12);

        // assert that your calculator added the numbers correctly!
        $this->assertEquals(42, $result);
    }

    public function testMultiply()
    {
        $calculator = new Calculator();
        $result = $calculator->multiply(30, 2);

        // assert that your calculator added the numbers correctly!
        $this->assertEquals(60, $result);
    }
}