<?php
/**
 * @link http://hocmai.vn/
 * @copyright Cong ty CP Dau tu va dich vu Giao duc
 * @license http://hocmai.vn/
 */
/**
 *
 * @author Thai Bui - Created At: 10/22/2019 - 11:35 AM
 * @version 1.0.0
 *
 */
use JasonGrimes\Paginator;
use Phalcon\Mvc\Model\Query\Builder;
use Phalcon\Mvc\View;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
class ReportsController extends \ControllerBase
{
  public function initialize()
  {

    parent::initialize();
        //addcss
    $this->assets->addCss('css/style.css');
    $this->assets->addCss('assets/icon/material-design/css/material-design-iconic-font.min.css');
    $this->assets->addCss('assets/icon/themify-icons/themify-icons.css');
    $this->assets->addCss('assets/icon/icofont/css/icofont.css');
    $this->assets->addCss('assets/icon/font-awesome/css/font-awesome.min.css');
    $this->assets->addCss('assets/pages/advance-elements/css/bootstrap-datetimepicker.css');
    $this->assets->addCss('bower_components/bootstrap-daterangepicker/css/daterangepicker.css');
    $this->assets->addCss('bower_components/select2/css/select2.min.css');
    $this->assets->addCss('bower_components/bootstrap-multiselect/css/bootstrap-multiselect.css');
    $this->assets->addCss('bower_components/multiselect/css/multi-select.css');
    $this->assets->addCss('assets/css/ukflex.css');

         //add js
    $this->assets->addJs('bower_components/bootstrap-daterangepicker/js/daterangepicker.js');
    $this->assets->addJs('bower_components/bootstrap-datepicker/js/bootstrap-datepicker.min.js');
    $this->assets->addJs('bower_components/select2/js/select2.full.min.js');
    $this->assets->addJs('bower_components/bootstrap-multiselect/js/bootstrap-multiselect.js');
    $this->assets->addJs('bower_components/multiselect/js/jquery.multi-select.js');
    $this->assets->addJs('assets/pages/advance-elements/select2-custom.js');
    $this->assets->addJs('assets/pages/form-validation/validate.js');
    $this->assets->addJs('assets/js/report.js');
    $this->assets->addJs('assets/js/filter_report.js');
    $this->assets->addJs('assets/js/chart/chart.js');

    $this->assets->addJs('js/datepicker.js');


        //them css hoac js ma xu ly rieng (do minh viet hoac tu thu vien) cho tung trang vao day (neu can thiet)
  }
   public function report_booksAction()
   {
        $now = date('Y-m-d', time());
        $end = date_create_from_format('Y-m-d H:i:s', $now . ' 23:59:59')->format('Y-m-d');
        $start = date_create_from_format('Y-m-d H:i:s', $now . ' 00:00:00')->sub(new DateInterval('P7D'))->format('Y-m-d');
        // $start = date_create_from_format('Y-m-d H:i:s', $now . ' 00:00:00')->format('Y-m-d');
        $this->view->setVars([
            'start' => $start,
            'end' => $end,
        ]);
  }
 
  public function report_billsAction()
  {
        $now = date('Y-m-d', time());
        $end = date_create_from_format('Y-m-d H:i:s', $now . ' 23:59:59')->format('Y-m-d');
        $start = date_create_from_format('Y-m-d H:i:s', $now . ' 00:00:00')->sub(new DateInterval('P7D'))->format('Y-m-d');
        $nhanvien = Teacher::find();
        $current_user = $this->session->get('user_fullname');
        // lấy ra mảng ngày 
        function getDatesFromRange($start, $end, $format = 'm/d/Y') {
            $array = array();
            $interval = new DateInterval('P1D');

            $realEnd = new DateTime($end);
            $realEnd->add($interval);

            $period = new DatePeriod(new DateTime($start), $interval, $realEnd);

            foreach($period as $date) { 
                $array[] = $date->format($format);
            }

            return $array;
        } 
        $array_date1 = getDatesFromRange($start,$end);
        $array_date = json_encode($array_date1);

        $bill = "SELECT DISTINCT  SUM(total_price) as total,created_by,created_at FROM Bills  WHERE created_by='$current_user' 
                AND DATE_FORMAT(created_at,'%Y-%m-%d') >= '$start' 
                AND DATE_FORMAT(created_at,'%Y-%m-%d') <= '$end'
                GROUP BY created_at "; 
        $bill_date = $this->modelsManager->executeQuery($bill)->toArray();
        foreach ($bill_date as $key => $value) {
                $date = $value['created_at'];
                $date = date_create($date);
                $date = date_format($date,"m/d/Y");
                $date_val[$date] = $value['total'];
        }
        foreach ($array_date1 as $key => $value) {
                $date1 = $value;
                $d[$date1] = '0';
        }
        $arr = array_merge($d,$date_val);
        foreach ($arr as $key => $value) {
                $data_value[] = str_replace('"', '', $value);

        }
        $data_value = json_encode($data_value);
        $this->view->setVars([
            'start' => $start,
            'end' => $end,
            'nhanvien' => $nhanvien,
            'data_value' => $data_value,
            'array_date' => $array_date,
        ]);
  } 
  public function filterbillsAction()
  { echo "<pre>";
          var_dump($post);
          exit();
    if ($this->request->isAjax() && $this->request->isPost()) {
          $post = $this->request->getPost('post');
          
          if (isset($post) && is_array($post) && count($post)) {
              foreach ($post as $key => $val) {
                  if (empty($val['value'])) continue;
                  $data[$val['name']] = htmlspecialchars(nl2br($val['value']));
              }
          }
    }
  }
  public function report_employeeAction()
  {
        $now = date('Y-m-d', time());
        $end = date_create_from_format('Y-m-d H:i:s', $now . ' 23:59:59')->format('Y-m-d');
        $start = date_create_from_format('Y-m-d H:i:s', $now . ' 00:00:00')->sub(new DateInterval('P7D'))->format('Y-m-d');
        // $start = date_create_from_format('Y-m-d H:i:s', $now . ' 00:00:00')->format('Y-m-d');
        $this->view->setVars([
            'start' => $start,
            'end' => $end,
        ]);
  } 
}