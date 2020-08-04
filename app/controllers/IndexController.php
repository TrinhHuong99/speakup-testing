<?php

use JasonGrimes\Paginator;
use Phalcon\Mvc\Model\Query\Builder;
use Phalcon\Mvc\View;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class IndexController extends ControllerBase
{

    /**
     * Luon co ham nay trong tung controller duoc ke thua tu controllerBase, va phai goi parent::initialize() cua lop
     * cha.
     * Viec nay giup dam bao viec tach rieng cac js va css ma minh them vao de xu ly rieng biet cho tung trang khong
     * anh huong toi cac thu viec va js ben tren, dong thoi tranh tinh trang nhung trang khac co js/css khong can thiet.
     *
     */
    public function initialize()
    {
        parent::initialize();
        $this->assets->addCss('css/style.css');
        // js
        $this->assets->addJs('assets/js/update.js');
        $this->assets->addJs('assets/js/jquery.timeago.js');
        //them css hoac js ma xu ly rieng (do minh viet hoac tu thu vien) cho tung trang vao day (neu can thiet)
    }

    public function indexAction()
    {
        $books = Book::find();
        foreach ($books as $key => $value) {
            $total_book[] =  $value->total_book;
        }
        $total_book = array_sum($total_book);

        $bills = Bills::find();
        $count_bill = count($bills);
        $book_sold = array();
        foreach ($bills as $key => $value) {
            $book_sold1 = explode(',',$value->book_id);
            foreach ($book_sold1 as $key => $value) {
                array_push($book_sold,$value);
            }
        }
        $book_sold = count($book_sold);
      
        $bill_sql = "SELECT DISTINCT  id,created_at,book_id,created_by FROM Bills 
                        ORDER BY created_at DESC LIMIT 0,7"; 
        $bill_date = $this->modelsManager->executeQuery($bill_sql)->toArray();
            // echo "<pre>";
        foreach ($bill_date as $key => $value) {
            $created_at = $value['created_at'];
            $book_count = str_replace(',', '', $value['book_id']);
            $book_count = strlen($book_count);
            $bill[$created_at]['created_by'] = $value['created_by'];
            $bill[$created_at]['id'] = $value['id'];
            $bill[$created_at]['book_count'] = $book_count;
        }
            // var_dump($bill);
            // exit();
        $this->view->setVars([
                'total_book' => $total_book,
                'count_bill' => $count_bill,
                'book_sold' => $book_sold,
                'bill' => $bill,
                // 'array_date' => $array_date,
        ]);

    }

}

