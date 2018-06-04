<?php

namespace Test\Unit;

use PHPUnit\Framework\TestCase;
use Mockery\Mockery as M;

class Base extends TestCase {

    /**
     * Close mockery connection
     *
     * @return void
     */
    public function tearDown() {
        M::close();
    }
}
